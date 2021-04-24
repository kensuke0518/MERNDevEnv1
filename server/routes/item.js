const express = require('express');
const router = express.Router();
const ItemModel = require('../models/itemModel');

router.post('/', (req, res) => {
    const Item = new ItemModel();

    Item.name = req.body.name;
    Item.category = req.body.category;
    Item.price = req.body.price;

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

//表示確認用
/*
router.get('/', (req, res) => {
    res.json({
        message: 'ここは/api/item/'
    })
})
router.get('/test', (req, res) => {
    res.json({
        message: 'ここは/api/item/test/'
    })
})
*/

module.exports = router;