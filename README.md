# mc-image-collector

## What't this ?

某「縦長画像閲覧サイト」のビューアを閲覧した通信履歴から、そこで観た画像を復元・保存するスクリプト。

## Prerequisite

- bash
  - grep, cat, sed, sort, uniq, curl が使える事
- Python3インストール済み
- Pythonライブラリのインストール
  - `pip install Pillow`
- Chromeでインターネット閲覧出来る

## Usage

1. `Chrome` で当該サイトを閲覧(一区切り分だけ)
2. `Chrome ` の開発者ツール(DevTools)「ネットワーク」の機能から「通信履歴ファイル(*.harファイル)」を取得
3. コンソールを開き、このリポジトリ直下からスクリプトを実行
        - `run_dl_and_unscramble.sh xxx.har`
4. *.harファイルの名前と同じフォルダが作成され、そこに画像が溜まる(上記例では `./xxx` フォルダ)
