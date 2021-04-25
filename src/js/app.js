import React from 'react';
import { connect } from 'react-redux';
import { itemAddAction } from './index';

//ステートのマッピング
function mapStateToProps(state) {
    return state;
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message:''
        }
        this.doChange = this.doChange.bind(this);
        this.doAction = this.doAction.bind(this);
    }
    doChange(e) {
        this.setState({
            message:e.target.value
        });
    }
    doAction(e) {
        e.preventDefault();
        this.props.dispatch(itemAddAction(this.state.message));
        this.setState({
            message: ''
        });
    }
    render() {
        return (
            <form onSubmit={this.doAction}>
                <input type="text" onChange={this.doChange} value={this.state.message} />
                <input type="submit" value="追加" />
            </form>
        );
    }
}
Search = connect(mapStateToProps)(Search);

class Itemlist extends React.Component {
    render() {
        let aaa;
        let i = 0;
        //console.log(this.props.data)
        //console.log([...this.props.data])
        aaa = this.props.data.map(value => {
            return <p key={ value.comment }>{ value.comment }</p>
        });
        return <div>{aaa}</div>
    }
}
Itemlist = connect(mapStateToProps)(Itemlist);

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