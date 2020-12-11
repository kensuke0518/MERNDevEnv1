const mongoose = require('mongoose'); //mongoDBに接続するためのライブラリ
const Schema = mongoose.Schema; //mongoDBのスキーマを作る
const moment = require('moment');

const ItemSchema = new Schema({
    name: String,
    category: String,
    price:Number
});

// スキーマをモデルとしてコンパイルし、それをモジュールとして扱えるようにする
module.exports = mongoose.model('ItemModel', ItemSchema);