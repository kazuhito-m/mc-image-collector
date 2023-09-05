import https from 'https';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

async function main() {
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
        await httpsDownload(page.url, dlPath);

    }

    const imagePath = path.join('.', workDirPath, 'scrambled_0001.jpg');

    const image = sharp(imagePath);
    let fixImage = image.clone();

    const cutImage = image.clone()
        .extract({
            top: 1000,
            left: 700,
            width: 50,
            height: 50
        });
    const cutImageBinary = await cutImage.toBuffer();

    fixImage.composite([
        {
            input: cutImageBinary,
            top: 50,
            left: 50,
            blend: 'over'
        },
        {
            input: cutImageBinary,
            top: 75,
            left: 75,
            blend: 'over'
        },
        {
            input: cutImageBinary,
            top: 125,
            left: 125,
            blend: 'over'
        }
    ])

    // const cutImage2 = image.clone()
    //     .extract({
    //         top: 200,
    //         left: 200,
    //         width: 50,
    //         height: 50
    //     });
    // const cutImageBinary2 = await cutImage2.toBuffer();

    // const fixImage2 = fixImage.clone();

    // fixImage2.composite([{
    //     input: cutImageBinary2,
    //     top: 100,
    //     left: 100,
    //     blend: 'over'
    // }])



    for (let i = 0; i < 40; i++) {
        // const cutImage = image.clone()
        //     .extract({
        //         top: 100,
        //         left: 100,
        //         width: 20,
        //         height: 20
        //     });
        // const cutImageBinary = await cutImage.toBuffer();

        // fixImage.composite([{
        //     input: cutImageBinary,
        //     top: i * 20,
        //     left: i * 20,
        //     blend: 'over'
        // }])

    }

    fixImage.toFile('./work/cut_test.jpg');


}

function scrambledFileNameOf(num) {
    const zpNum = zp(num, 4);
    return `scrambled_${zpNum}.jpg`;
}

function zp(value, length) {
    return ('0'.repeat(length) + value).slice(-length);
}

async function httpsDownload(url, localPath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            response.on('data', (chunk) => {
                fs.appendFileSync(localPath, chunk);
            });
            response.on('end', () => {
                resolve('File downloaded and stored at: ' + localPath);
            });
        }).on("error", (err) => { reject(new Error(err.message)) });
    })
}

await main();
