# MERNDevEnv1
MERNスタック（MongoDB, Express, React, Node.js）開発環境の最小構成です。  
状態管理にReduxを用いています。

## Reduxについて
### Reduxの流れ
イベントが発生する（入力など）  
イベントの処理中にdispatchを実行する。
↓  
アクションクリエイターに値が渡されて、アクションのオブジェクトを返す  
↓  
dispatchしたことでレデューサーが呼び出され、ステートと先ほどのアクションオブエジェクトを引数にして実行し、ステートを変更する。  
↓  
ステートが変更されたことにより、コンポーネントが再描画される。  

### Reduxに必要なもの
https://docs.google.com/spreadsheets/d/1xPQ7nLVP4uDpM4nJe9GhTpDhra0xzWnK42NK52oi51o/edit#gid=274878124&range=A59  
- ストア
    - レデューサー
    - ステート
- プロバイダー
- アクションクリエイター
- ディスパッチ（React内でアクションクリエイターを引数にして実行）

参考：  
https://qiita.com/kitagawamac/items/49a1f03445b19cf407b7  


## 各フォルダとファイルの説明
1. `/docs`
本番公開用。`npm run build`で`/docs`用にファイルを生成する。
2. `/server`
    バックエンド部分を担当する。Expressサーバー。次の業務を担当する。
    - MongoDBへの接続設定。`/server/models/itemModels.js`とMongooseで連携。
    - ルーティング。`/server/routes/`内のファイルがルーターとなる。
    - バックエンドExpressサーバー。ポートは3000番。
    - 以上の内容は`server.js`に集約される事になる
        1. `/server/models`
        - DB（MySQLなど）のテーブルの作成に相当する。`module exports`で全体で扱えるようにして`/server/routes/`内のファイル（例として`item.js`）から`module exports`されたモデルを利用してMongoDBへの読み書き（`post`や`get`, `put`, `delete`）を行う。
        2. `/server/routes`
        - ルーター。ルーティングによるURL生成とCRUD部分を担う。
3. `/src`
    フロントエンド部分を担当する。HTMLやSass、React、Redux（状態管理）はここで行う。
    1. `/src/html`
    webpackの「`html-webpack-plugin`」によって`/docs`にファイルが生成される  
    `/docs/index.html`などを編集したい場合はここから変更を行う。  
    2. `/src/js`
    React、Reduxを担当する。  
    バックエンドからDB（API？）をfetchなどで読み書きを行う。  



## 使い方
1. npm scriptsの`npm run dev`で開発環境が走る。
2. `src/js/index.js`と`server/server.js`の「表示確認用」のコメントを外して表示を確認する。3へ続く。
3. フロントエンドサーバーとバックエンドサーバーの両方にアクセスして、表示されるか確認。
- http://localhost:8080/ ⇦フロントエンドサーバー（`webpack-dev-server`）フロントエンド開発時に利用。
- http://localhost:3000/ ⇦バックエンドサーバー（Expressサーバー）バックエンドAPI利用時に使用。
- http://localhost:8080/api/ ⇦`server/server.js`でルーティングしているページ。`{api:'test'}`が表示されているか
- http://localhost:8080/api/item/ ⇦バックエンドからフロントエンドへプロクシを繋いでCORS問題が解消されているか確認。`{api:'接続されていることが確認できています。'}`と表示されていればOK
- ※上記は
4. `server/server.js`の接続確認用をコメントアウトして、「Express基本設定」以下のコメントアウトを解除する。
5. `routes/index.js`の表示確認用をコメントアウト解除して、以下のURLにアクセスする
- http://localhost:8080/api/ ⇦`{"message":"こんにちは、世界"}`と表示されていればOK
- 別ウインドウでターミナルを開き、`curl http://localhost:8080/api/ | jq .`を実行して`{"message":"こんにちは、世界"}`と表示されていればOK
6. 5.をコメントアウトする。
7. DBを起動する。DBフォルダを任意の場所に作成する。
- ターミナルをもう一つ開き、次のコマンドを起動する。
- `sudo mongod --dbpath /Users/morinagakensuke/Documents/ProgrammingTest/project/__dbfolder/任意で作成したフォルダ名`
8. DBモデルはすでに`server/models/itemModel.js`に作成してある。
- DBモデル参考：https://qiita.com/ngmr_mo/items/73cc7160d002a4989416#model%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E4%BD%9C%E6%88%90
9. POSTしてデータが記録されるか確認する。ターミナルをもう一つ開き、curlで下記のコマンドを実行する。
- `curl -X POST -H "Content-Type: application/json" -d '{"name":"名前のデータです。", "category":"カテゴリーのデータです。", "price":"1234567890"}' localhost:3000/api/item/`
- POSTが成功していれば`models/itemModel.js`に書かれてる`{ message: 'DBと接続成功' }`という文字がターミナルに表示される。
10. http://localhost:8080/api/item/ にアクセスして先ほどPOSTした情報が表示されているか確認
- ターミナルで`curl http://localhost:8080/api/item/ | jq .`を実行することでも表示を確認することができる
11. 完了。

※あとは、React.jsやJavaScriptでSPAを構築する作業お行う。





## 参考元
https://docs.google.com/spreadsheets/d/1xPQ7nLVP4uDpM4nJe9GhTpDhra0xzWnK42NK52oi51o/edit#gid=1511416112  
https://qiita.com/ohs30359-nobuhara/items/bdc06b2db1bef7af2439  〜lintの導入まで
https://qiita.com/ngmr_mo/items/73cc7160d002a4989416#api%E3%82%92%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%A7%E5%88%86%E3%81%91%E3%81%A6%E7%B6%BA%E9%BA%97%E3%81%AB%E3%81%99%E3%82%8B  ページ内リンク先以降


## プロジェクト別
`//プロジェクトに合わせて変更する。`という箇所を変更する。

## 更新時に気をつけたいこと
- 差分のみを更新する
Reactは、ステートを利用して、ステートに変更があれば、その差分のみを再描画することができる。 
