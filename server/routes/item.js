const express = require('express');
const router = express.Router();
const ItemModel = require('../models/itemModel');

router.post('/', (req, res) => {
    const Item = new ItemModel();
    //プロジェクトに合わせて変更する。
    Item.comment = req.body.comment;
    Item.time = req.body.time;

    Item.save(err => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'DBと接続成功' });
        }
    })
})

router.get('/', (req, res)=>{
    ItemModel
        .find()
        .then(items=>{
            res.json(items);
        });
});

module.exports = router;