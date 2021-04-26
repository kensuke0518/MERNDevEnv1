import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { App } from './app';

// =========== Redux =========== //
/**
 * アクションクリエイター
 * 
 * - ユーザーのイベントによってアクションを作成する。
 * - React（コンポーネント）からdispatchで呼び出す。
 * - returnされる値はレデューサーの引数actionとなる。
 */
//コメント追加（CREATE）
export function createAction(text) {
    return {
        type: 'add',
        text,
    }
}
//コメント表示（READ）
const readAction = (json) => {
    return {
        type: 'display',
        data: json,
    }
}
//コメント更新（UPDATE）

//コメント削除（DELETE）
export function deleteAction(num) {
    return {
        type: 'delete',
        num,
    }
}
//統合アクションクリエイター
//CREATE（POST）
export const postPosts = () => {
    return (dispatch) => {
        fetch(`http://localhost:8080/api/item/`, {
            method: 'POST'
        })
    }
}
//READ（GET）
export const getPosts = () => {
    return (dispatch) => {
        fetch(`http://localhost:8080/api/item/`)
            .then(res =>
                res.json()
            ).then(data =>
                dispatch(readAction(data))
            )
    }
}
//UPDATE
//DELETE

/**
 * レデューサー
 * 
 * - アクションを元にステートを更新する。
 * - returnではステートの項目を全て返すようにしなければいけない？
 */
function mainReducer(state = initialState,action) { //actionって何？ = dispatchを呼び出してアクションクリエイターが返すオブジェクト。actionの中にはaction.typeオブジェクトが必要で、それを元にレデューサーの処理を分ける事になる。
    //console.log(state);
    switch (action.type) {
        case 'display':
            return readReducer(state, action);
        case 'add':
            return createReducer(state, action);
        case 'delete':
            return deleteReducer(state, action)
        default:
            return state;
    }
}
//コメント追加（CREATE）
function createReducer(state, action) {
    let eventData = {
        comment: action.text,
        number: state.data.length,
        time: new Date(),
    }
    let newData = state.data.slice(); // setStateするとき、stateにある値をそのまま渡すと、「変更なし」と判断してストアの値を更新しないから、このようにsliceを使って新しく配列を作り直している。
    newData.push(eventData);
    console.log(newData);
    fetch(`http://localhost:8080/api/item/`, {
        method: 'POST',
        body: JSON.stringify(newData)
    }).then(res => {
        return res.json();
    }).then(json => {
    })
    //console.log(newData);
    return {
        data: newData,
        mode: 'default',
    }
}
//コメント表示（READ）
function readReducer(state, action) {
    let initData = action.data;
    return {
        data: initData,
        mode: 'default',
    }
}
//メモ削除のレデューサー
function deleteReducer(state, action) {

}


/**
 * ステート
 */
let initialState = {
    data: [],
    mode: 'default',
}


/**
 * ストア
 */
export let mainStore = createStore(mainReducer, applyMiddleware(thunk, logger));

//初期表示の実行
mainStore.dispatch(getPosts());


/**
 * プロバイダーとレンダリング
 */
ReactDOM.render(
    <Provider store={mainStore}>
        <App />
    </Provider>,
    document.getElementById('index')
);
