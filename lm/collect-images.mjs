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

    const pages = loadPagesSpecificationByJsFile(dataJsFilePath);

    await downloadAllScrambledImages(pages, workDirPath);


    // TODO 試しに一つだけ
    const page = pages['0'];

    const tileAriaRight = page.iw - (page.iw % page.bwd);
    const tileAriaBottom = page.ih - (page.ih % page.bwd);

    const tileWidth = tileAriaRight / page.hc;
    const tileHeight = tileAriaBottom / page.vc;

    // TODO DEBUG,ファイルは決め打ち。
    const imagePath = path.join('.', workDirPath, 'scrambled_0001.jpg');
    const image = sharp(imagePath);

    const tileImages = [];
    for (let y = 0; y < page.vc; y++) {
        const top = tileHeight * y;
        for (let x = 0; x < page.hc; x++) {
            const left = tileWidth * x;
            const tileImage = image.clone()
                .extract({
                    top: top,
                    left: left,
                    width: tileWidth,
                    height: tileHeight
                });
            const tileBuffer = await tileImage.toBuffer();
            tileImages.push(tileBuffer);
        }
    }

    const scrambledPositions = page.metadata.m
        .map(numOf35Base => numOf35ToDecimal(numOf35Base))
    // for (let i = 0; i < scrambledPositions.length; i++) {
    //     const pos = scrambledPositions[i];
    //     console.log(i + "\t" + pos);
    // }
    for (let i = 0; i < page.metadata.m.length; i++) {
        const text = page.metadata.m[i];
        const decimal = numOf35ToDecimal(text);
        console.log(i + "\t" + text + "\t" + decimal);
    }
    // let fixImage = image.clone();

    // const cutImageBinary = await cutImage.toBuffer();

    // const pasteImages = [];
    // for (let i = 0; i < 30; i++) {
    //     const pasteStatus = {
    //         input: cutImageBinary,
    //         top: i * 25,
    //         left: i * 25,
    //         blend: 'over'
    //     };
    //     pasteImages.push(pasteStatus);
    // }

    // fixImage.composite(pasteImages);
    // fixImage.toFile('./work/cut_test.jpg');
}

function loadPagesSpecificationByJsFile(jsFilePath) {
    const imageDifinitionJs = fs.readFileSync(jsFilePath, 'utf8');

    const geval = eval; // FIXME おまじないすぎる…なぜ動くか知った上で使いたい。 https://stackoverflow.com/questions/52160557/fail-to-create-variable-using-eval-in-node-js-es6
    geval(imageDifinitionJs);

    return portal_pages;
}

async function downloadAllScrambledImages(pages, workDirPath) {
    for (const page of Object.values(pages)) {
        const dlPath = path.join(workDirPath, scrambledFileNameOf(page.page_number));
        await httpsDownload(page.url, dlPath);
    }
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

function numOf35ToDecimal(numbOf35BaseText) {
    let decimal = 0;
    return numbOf35BaseText.split('')
        .reverse()
        .map(oneChar => numOf3tToDecimalChar(oneChar))
        .map((num, i) => (35 ** i) * num)
        .reduce((total, value) => total + value);

}

function numOf3tToDecimalChar(numbOf35BaseOneChar) {
    const baseCharCode = isNumeric(numbOf35BaseOneChar)
        ? '0'.charCodeAt()
        : 'a'.charCodeAt() - 10;
    return numbOf35BaseOneChar.charCodeAt() - baseCharCode;
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

await main();
