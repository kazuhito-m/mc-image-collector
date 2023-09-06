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

    const imageDifinitionJs = fs.readFileSync(dataJsFilePath, 'utf8');
    const geval = eval; // FIXME おまじないすぎる…なぜ動くか知った上で使いたい。 https://stackoverflow.com/questions/52160557/fail-to-create-variable-using-eval-in-node-js-es6
    geval(imageDifinitionJs);   // define valiable: portal_pages, imgs

    if (!isEmptyAssociativeArray(portal_pages))
        await collectScrambledImages(portal_pages, workDirPath);

    if (!isEmptyAssociativeArray(imgs))
        await collectNaturalImages(imgs, workDirPath);
}

async function collectScrambledImages(pages, workDirPath) {
    await downloadAllScrambledImages(pages, workDirPath);

    for (const page of Object.values(pages)) {
        await unsubscribeImageFile(page, workDirPath);
    }
}

async function unsubscribeImageFile(page, workDirPath) {
    const meta = page.metadata;

    const tileAriaRight = meta.iw - (meta.iw % meta.bwd);
    const tileAriaBottom = meta.ih - (meta.ih % meta.bwd);

    const tileWidth = tileAriaRight / meta.hc;
    const tileHeight = tileAriaBottom / meta.vc;

    const scrambledImagePath = path.join(workDirPath, scrambledFileNameOf(page.page_number));
    const image = await sharp(scrambledImagePath);

    const tileImages = [];
    for (let row = 0; row < meta.vc; row++) {
        const top = tileHeight * row;
        for (let col = 0; col < meta.hc; col++) {
            const left = tileWidth * col;
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

    const scrambledPositions = meta.m
        .map(numOf35Base => numOf35ToDecimal(numOf35Base))

    const pasteImages = [];
    for (let i = 0; i < scrambledPositions.length; i++) {
        const pos = scrambledPositions[i];

        const col = i % meta.hc;
        const row = i / meta.hc | 0;

        const pasteStatus = {
            input: tileImages[pos],
            top: tileWidth * row,
            left: tileHeight * col,
            blend: 'over'
        };
        pasteImages.push(pasteStatus);
    }

    image.composite(pasteImages);

    image.toFile(unscrambledImagePathOf(page, workDirPath));
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

function unscrambledImagePathOf(page, workDirPath) {
    return numberJpegFilePathOf(page.page_number, workDirPath)
}

function numberJpegFilePathOf(value, dirPath) {
    return path.join(dirPath, zp(value, 4) + '.jpg');
}

async function collectNaturalImages(imgs, workDirPath) {
    for (const key in Object.keys(imgs)) {
        const img = imgs[key];
        console.log('keyの値は ' + key + 'で、型は ' + typeof key);
        const dlPath = numberJpegFilePathOf(key, workDirPath);
        await httpsDownload(img.url, dlPath);
    }
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

function isEmptyAssociativeArray(value) {
    return !value || !Object.keys(value).length;

}

await main();
