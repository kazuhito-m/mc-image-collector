# ロジック

## スクランブル掛かってるものを復元する方法

- ビューアのHTMLをブラウザで「htmlで保存(mhtmlなどではない、テキストだけのHTML)」する
- HTML内の `<script>` タグ内に、JavaScriptにて `portal_pages` という配列が在り、それに「画像を落とすべきURL」「スクランブルのパネル分割数」「最小(切り捨て)ピクセル数」等の情報が在る
- そして `portal_pages[x].metadata.m[y]` の配列に「スクランブルのパネルを並べ戻す順番」が「35進数」で埋まってるので、それに従って、画像を復元していく

## 参考

- 画像ライブラリ:sharp
  - https://sharp.pixelplumbing.com/
  - https://qiita.com/t_o_d/items/cbd2dd557ef7bbe78470
  - https://blog.kozakana.net/2019/04/sharp-image-processing/
- Node.js(JavaScript)基本形
  - https://kb.upken.jp/nodejs-eval2.html
  
### eval()まわりの話

ES の eval は、関数呼び出し構文において、プロパティ参照ではなく参照名が 'eval' の場合のみ現在のスコープで実行される (Direct eval) 。

それ以外の方法で eval 関数を起動した場合はグローバルスコープで実行される。

- cf. CallExpression セマンティック: https://tc39.es/ecma262/#sec-function-calls-runtime-semantics-evaluation
- cf. Eval の実装: https://tc39.es/ecma262/#sec-performeval

eval('foo') はレキシカルスコープ、globalThis.eval('foo') はグローバルスコープ。 
