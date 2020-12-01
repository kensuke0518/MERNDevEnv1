const express = require('express');
const router = express.Router();
const ArticleModel = require('../modules/articleModel');

router.post('/', (req, res) => {
    const Article = new ArticleModel();

    Article.title = req.body.title;
    Article.text = req.body.text;

    Article.save(err => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'DBと接続成功' });
        }
    })
})

router.get('/', (req, res)=>{
    ArticleModel
        .find()
        .then(articles=>{
            res.json(articles);
        });
});

/*
router.get('/', (req, res) => {
    res.json({
        message: 'ここは/api/article/'
    })
})

router.get('/test', (req, res) => {
    res.json({
        message: 'ここは/api/article/test/'
    })
})
*/

module.exports = router;