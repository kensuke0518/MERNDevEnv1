import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from './app';

//Redux

/**
 * アクションクリエイター
 * - ユーザーのイベントによってアクションを作成する。
 * - React（コンポーネント）からdispatchで呼び出す。
 * - returnされる値はレデューサーの引数actionとなる。
 */
//メモ追加のアクションクリエイター
export function itemAddAction(text) {
    //ここに引数stateにいろんな処理が入って最終的に加工したものをreturnする。
    return {
        type: 'add',
        text,
    }
}
//メモ削除のアクションクリエイター
export function itemDeleteAction(num) {
    return {
        type: 'delete',
        num,
    }
}

/**
 * ステート
 */
let itemState = {
    data: [
        {
            comment: '最初のコメントです。',
            num: 0,
            time: new Date(),
        },
        {
            comment: '二番目のコメントです。',
            num: 1,
            time: new Date(),
        },
    ],
    mode:'default',
}

/**
 * レデューサー
 * - アクションを元にステートを更新する。
 * - returnではステートの項目を全て返すようにしなければいけない？
 */
function itemReducer(state = itemState,action) { //actionって何？ = dispatchを呼び出してアクションクリエイターが返すオブジェクト。actionの中にはaction.typeオブジェクトが必要で、それを元にレデューサーの処理を分ける事になる。
    switch (action.type) {
        case 'add':
            return itemAddReducer(state, action)
        case 'delete':
            return itemDeleteReducer(state, action)
        default:
            return state;
    }
}
//メモ追加のレデューサー
function itemAddReducer(state, action) {
    let eventData = {
        comment: action.text,
        num: state.data.length,
        time: new Date(),
    }
    let newData = state.data.slice(); // setStateするとき、stateにある値をそのまま渡すと、「変更なし」と判断してストアの値を更新しないから、このようにsliceを使って新しく配列を作り直している。
    newData.unshift(eventData);
    return {
        data: newData,
        mode: 'default',
    }
}
//メモ削除のレデューサー
function itemDeleteReducer(state, action) {

}

/**
 * ストア
 */
export let itemStore = createStore(itemReducer);

/**
 * プロバイダーとレンダリング
 */
ReactDOM.render(
    <Provider store={itemStore}>
        <App />
    </Provider>,
    document.getElementById('index')
);
