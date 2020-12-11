import React from 'react';
import { connect } from 'react-redux';
import { itemFindReduce } from './index';

class App extends React.Component{
    render() {
        <div>
            <Search />
            <Itemlist />
        </div>
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    doAction() {
        
    }
    render() {
        <input type="text" />
    }
}

class Itemlist extends React.Component {
    constructor(props) {
        super(props);
    }
}
Itemlist = connect(state => state)(Itemlist);




export default App;