# MERNDevEnv1
MERNスタック（MongoDB, Express, React, Node.js）開発環境の最小構成です。  

## 使い方
1. npm scriptsの`npm run dev`で開発環境が走る。
2. `src/js/index.js`と`server/server.js`の「表示確認用」のコメントを外して表示を確認する。3へ続く。
3. フロントエンドサーバーとバックエンドサーバーの両方にアクセスして、表示されるか確認。
- http://localhost:8080/ ⇦フロントエンドサーバー（webpack-dev-server）フロントエンド開発時に利用。
- http://localhost:3000/ ⇦バックエンドサーバー（expressサーバー）バックエンドAPI利用時に使用。
- http://localhost:8080/api/ ⇦server/server.jsでルーティングしているページ。`{api:'test'}`が表示されているか
- http://localhost:8080/api/item/ ⇦バックエンドからフロントエンドへプロクシを繋いでCORS問題が解消されているか確認。`{api:'接続されていることが確認できています。'}`と表示されていればOK
- ※上記は
4. server/server.jsの接続確認用をコメントアウトして、「Express基本設定」以下のコメントアウトを解除する。
5. routes/index.jsの表示確認用をコメントアウト解除して、以下のURLにアクセスする
- http://localhost:8080/api/ ⇦`{"message":"こんにちは、世界"}`と表示されていればOK
- 別ウインドウでターミナルを開き、`curl http://localhost:8080/api/ | jq .`を実行して`{"message":"こんにちは、世界"}`と表示されていればOK
6. 5.をコメントアウトする。
7. DBを起動する。DBフォルダを任意の場所に作成する。
- ターミナルをもう一つ開き、次のコマンドを起動する。
- `sudo mongod --dbpath /Users/morinagakensuke/Documents/ProgrammingTest/project/__dbfolder/任意で作成したフォルダ名`
8. DBモデルはすでにserver/models/itemModel.jsに作成してある。
- DBモデル参考：https://qiita.com/ngmr_mo/items/73cc7160d002a4989416#model%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E4%BD%9C%E6%88%90
9. POSTしてデータが記録されるか確認する。ターミナルをもう一つ開き、curlで下記のコマンドを実行する。
- `curl -X POST -H "Content-Type: application/json" -d '{"name":"名前のデータです。", "category":"カテゴリーのデータです。", "price":"1234567890"}' localhost:3000/api/item/`
- POSTが成功していればmodels/itemModel.jsに書かれてる`{ message: 'DBと接続成功' }`という文字がターミナルに表示される。
10. http://localhost:8080/api/item/ にアクセスして先ほどPOSTした情報が表示されているか確認
- ターミナルで`curl http://localhost:8080/api/item/ | jq .`を実行することでも表示を確認することができる
11. 完了。

※あとは、React.jsやJavaScriptでSPAを構築する作業お行う。





## 参考元
https://docs.google.com/spreadsheets/d/1xPQ7nLVP4uDpM4nJe9GhTpDhra0xzWnK42NK52oi51o/edit#gid=1511416112  
