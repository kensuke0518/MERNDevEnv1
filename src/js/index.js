import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import App from './app';

// 表示確認用
fetch('/api/item/').then(res => {
    console.log(res.json());
});
const Index = () => {
    return <div>Hello,World!</div>
}
ReactDOM.render(<Index />, document.getElementById("index"));

// ステート
/*
let iteState = {
    data: [
        {
            name: 'ふわふわソファー',
            category: 'ソファー',
            price: 10000
        },
        {
            name: '事務用机',
            category: 'デスク',
            price: 5000
        }
    ],
    message:'検索語句を入力してください',
    findData:[]
}

// レデューサー
function itemReducer(state = itemState,action) {
    switch (action.type) {
        case 'find':
            return itemFindReduce(state,action)
        default:
            return state;
    }
}

// アクションクリエイター：アイテム検索のアクション
export function itemFindReduce(state, action) {
    let find = action.find;
    let resultData = [];
    state.data.forEach(value => {
        if (value.name.indexOf(find) >= 0) {
            resultData.push(value);
        }
    });
    return {
        data: state.data,
        message: '',
        findData: resultData
    }
}

// ストア
let itemStore = createStore(itemReducer);
*/

// レンダリングとProvider
/*
ReactDOM.render(
    <Provider store={itemStore}>
        <App />
    </Provider>,
    document.getElementById('index'));
*/

//表示確認用