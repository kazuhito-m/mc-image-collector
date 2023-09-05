# ロジック

## スクランブル掛かってるものを復元する方法

- 落としてきた画像を4x4=16のタイルにする
  - 上下ともに32で割り、最大割れた数を領域とする
  - 例えば、192xpの場合、200/32=6余り8で、196pxを領域とする
- 左上->右下に向け、0-15の番号をつける
- xmlの<Scramble>タグにあるCSVにしたがって、左上からタイルの番号通りに並べていく


## 分割ファイルの結合の仕方

- `000x.xml` の `Page/Sheet/X` と `Y` が「分割された画像の行・列の数」なので、それを取得
- XとYを掛けた数分、画像ファイルがあるはずなので、上記XMLのファイル名の `000x` の部分プラス連番 `000x_000y.bin` ファイルを取得し、前述スクランブルを解除しておく
- X・Yの行・列にしたがって、左上->右下へと、連番画像を結合する


## 参考

- 画像ライブラリ:Pillow
  - https://camp.trainocate.co.jp/magazine/python-pillow/
  - https://imagingsolution.net/program/python/pillow/pillow_image_crop/
- Python基本形
  - https://www.javadrive.jp/python/if/index1.html
  - https://note.nkmk.me/python-os-basename-dirname-split-splitext/
  - https://note.nkmk.me/python-str-replace-translate-re-sub/
  - https://www.javadrive.jp/python/file/index2.html
  - https://docs.python.org/ja/3/library/xml.etree.elementtree.html
  - https://pythonexamples.org/python-convert-csv-string-to-list/
  - https://qiita.com/Alice1017/items/0464a38ab335ac3b9336
