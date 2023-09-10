# ロジック

## サイト全体から「種類」を取る方法

- サイトの `/series` をふっつーに取ってきて、中身を解析
- 恐らく「直下のdiv」を解析すれば良さそう
  - classが一つしかなく、かつ「”ｓ”から始まり、その後全部数値」なDivを取れば良い…のではないかな？
- ただし、div内には「一話目のリンク」しかないので、それを一意として取って、ページリクエストしないと「一つの作品」にならない…かも？

## 一つの作品から「話」を取る方法


## スクランブル解除方法

- 画像を8で割った余りを切ったものを「タイル領域」にする
- 4x4=16分割する
- 右に展開していたものを縦に展開して並び替えたら終了


## 制約的な観点でのいろいろ


## 参考

- TypeScriptでコンソールアプリを作成する方法
  - https://blog.logrocket.com/building-typescript-cli-node-js-commander/
- TypeScript単体では `@` を解決してくれない、という話
  - https://www.agent-grow.com/self20percent/2019/03/11/typescript-paths-work-careful/
- Node.jsでDIの話
  - https://dev.classmethod.jp/articles/trying-out-di-dependency-inversion-and-di-container-in-node-js/
  - https://www.cyokodog.net/blog/inversify-js/
  - https://kotamat.com/post/inversify/
