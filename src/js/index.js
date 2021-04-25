import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from './app';

// 表示確認用
/*
fetch('/api/item/').then(res => {
    console.log(res.json());
});
const Index = () => {
    return <div>Hello,World!</div>
}
ReactDOM.render(<Index />, document.getElementById("index"));
*/

//Redux
// ステート
let itemState = {
    data: [
        {
            comment: '最初のコメントです。',
            time: new Date()
        }
    ]
}

// アクションクリエイター：ユーザーのイベントによってアクションを作成する。
export function itemFindReduce(state) {
    //ここに引数stateにいろんな処理が入って最終的に加工したものをreturnする。
    return {
        data: state.data,
    }
}

//ディスパッチ：アクションをストア（レデューサーとステートの集まり）に送る。
//dispatch(itemFindReduce());


// レデューサー:アクションを元にステートを更新する。
function itemReducer(state = itemState,action) { //actionって何？ = dispatchが返すオブジェクトのことだと思う。actionの中にはaction.typeオブジェクトが必要で、それを元にレデューサーの処理を分ける事になる。
    switch (action.type) {
        case 'find':
            return itemFindReduce(state,action)
        default:
            return state;
    }
}

// ストア
let itemStore = createStore(itemReducer);

// レンダリングとProvider
ReactDOM.render(
    <Provider store={itemStore}>
        <App />,
    </Provider>,
    document.getElementById('index')
);
