const mongoose = require('mongoose'); //mongoDBに接続するためのライブラリ
const Schema = mongoose.Schema; //mongoDBのスキーマを作る
const moment = require('moment');

//プロジェクトに合わせて変更する。
const ItemSchema = new Schema({
    comment: String,
    number: Number,
    time: Number,
});

// スキーマをモデルとしてコンパイルし、それをモジュールとして扱えるようにする
module.exports = mongoose.model('ItemModel', ItemSchema);