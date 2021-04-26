import React from 'react';
import { connect } from 'react-redux';
import { createAction } from './index';

//ステートのマッピング
function mapStateToProps(state) {
    return state;
}

class Write extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment:''
        }
        this.doChange = this.doChange.bind(this);
        this.doAction = this.doAction.bind(this);
    }
    doChange(e) {
        this.setState({
            comment:e.target.value
        });
    }
    doAction(e) {
        e.preventDefault();
        this.props.dispatch(createAction(this.state.comment));
        this.setState({
            comment: ''
        });
    }
    render() {
        return (
            <form onSubmit={this.doAction}>
                <input type="text" onChange={this.doChange} value={this.state.comment} />
                <input type="submit" value="追加" />
            </form>
        );
    }
}
Write = connect(mapStateToProps)(Write);

class Itemlist extends React.Component {
    render() {
        let aaa;
        let i = 0;
        //console.log(this.props.data)
        //console.log([...this.props.data])
        aaa = this.props.data.map(value => {
            return <p key={ value.id }>{ value.comment }</p>
        });
        return <div>{aaa}</div>
    }
}
Itemlist = connect(mapStateToProps)(Itemlist);

export class App extends React.Component {
    render() {
        return (
            <div>
                <Write />
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