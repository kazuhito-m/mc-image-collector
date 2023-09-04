# ロジック

## スクランブル掛かってるものを復元する方法

- 720x1440の画像を4x4=16のタイルにする
  - 横は余りが少し在る、700/4=175px?
  - 縦は割り切れてるので1440/4=360px
- 左上->右下に向け、0-15の番号をつける
- xmlの<Scramble>タグにあるCSVにしたがって、左上からタイルの番号通りに並べていく

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
