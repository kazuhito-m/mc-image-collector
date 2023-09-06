# lm-image-collector

## What't this ?

某「”線”なコミニュケーションツール系の名前を冠した画像閲覧サイト」のビューアのHTMLから、そこで観た画像を復元・保存するスクリプト。

## Prerequisite

- bash
  - grep, cat, sed, sort, uniq, curl が使える事
- node/npmインストール済み
  - node19以上と、それに準じたnpm
- npmで「このスクリプト用のライブラリ」を予め導入している
  - `npm install`
- Chromeでインターネット閲覧出来る

## Usage

1. `Chrome` で当該サイトのビューアを閲覧
2. `Chrome` でそのページをHTMLとして保存(`完全` や `.mhtml` ではなく、`HTMLのみ(.html)`)
3. コンソールを開き、このリポジトリ直下からスクリプトを実行
    - `./run_dl_and_unscramble.sh xxx.html`
4. *.htmlファイルの名前と同じフォルダが作成され、そこに画像が溜まる(上記例では `./xxx` フォルダ)
