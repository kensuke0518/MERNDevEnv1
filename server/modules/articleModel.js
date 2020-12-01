const mongoose = require('mongoose'); //mongoDBに接続するためのライブラリ
const Schema = mongoose.Schema; //mongoDBのスキーマを作る
const moment = require('moment');

const ArticleSchema = new Schema({
    title: String,
    text: String,
    date: String
});

ArticleSchema.methods.setDate = function () {
    //作った時間をセット
    this.date = moment().format("YYYY-MM-DD HH:mm:ss");
};

// スキーマをモデルとしてコンパイルし、それをモジュールとして扱えるようにする
module.exports = mongoose.model('ArticleModel', ArticleSchema);