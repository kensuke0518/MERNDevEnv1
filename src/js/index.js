import React from 'react';
import ReactDOM from 'react-dom';

fetch('/api/article').then(res => {
    console.log(res.json());
})

const Root = () => {
    return <div>Hello,World!</div>
}

ReactDOM.render(<Root />, document.getElementById('root'));