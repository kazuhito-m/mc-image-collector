import https from 'https';
import fs from 'fs';
import path from 'path';

function main() {
    if (process.argv.length < 3) {
        console.log('引数に「画像取得情報の載ったJSファイル(*.js)を指定して下さい。');
        process.exitCode = 1;
        return;
    }
    const dataJsFilePath = process.argv[2];
    const workDirPath = path.dirname(dataJsFilePath);
    const geval = eval; // FIXME おまじないすぎる…なぜ動くか知った上で使いたい。 https://stackoverflow.com/questions/52160557/fail-to-create-variable-using-eval-in-node-js-es6

    const imageDifinitionJs = fs.readFileSync(dataJsFilePath, 'utf8');
    geval(imageDifinitionJs);
    const pages = portal_pages;

    // ファイルをすべて一度ダウンロード
    for (const key in pages) {
        const page = portal_pages[key];

        const dlPath = path.join(workDirPath, scrambledFileNameOf(page.page_number))
        httpDownload(page.url, dlPath);
    }
}

function scrambledFileNameOf(num) {
    const zpNum = zp(num, 4);
    return `scrambled_${zpNum}.jpg`;
}

function zp(value, length) {
    return ('0'.repeat(length) + value).slice(-length);
}

function httpDownload(url, localPath) {
    const stream = fs.createWriteStream(localPath);
    const req = https.get(url, res => {
        res.pipe(stream);
        res.on('end', () => stream.close());
    });
}

main();
