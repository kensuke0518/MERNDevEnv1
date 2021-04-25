import React from 'react';
import { connect } from 'react-redux';
import { itemFindReduce } from './index';

class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <input type="text" />
    }
}

class Itemlist extends React.Component {
    constructor(props) {
        super(props);
    }
}
Itemlist = connect(state => state)(Itemlist);

export class App extends React.Component {
    render() {
        return (
            <div>
                <Search />
                <Itemlist />
            </div>
        );
    }
}
//表示確認用
/*
export class App extends React.Component {
    render() {
        return <div>aaa</div>
    }
}
*/

