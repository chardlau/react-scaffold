import React, {Component, useState} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import loadable from '@loadable/component';

import Avatar from './assets/avatar.jpeg';

import styles from './styles/App.m.less';
import './styles/App.css';

import Test from './components/Test';
const Home = loadable(() => import(/* webpackChunkName: 'home' */'./routes/Home'));

function Demo(props) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
    const { onChange } = props;
    onChange && onChange(!open);
  }

  return (
    <button onClick={handleClick}>
      IS NOW OPEN: {String(open)}
    </button>
  );
}

function Post () {
  return <div>Post</div>
}

class App extends Component {
  state = {
    count: 0,
    test: null
  };

  componentDidMount() {
    const test_object_assign = Object.assign({}, { a: 123 });
    const test_destructuring_object = { ...test_object_assign, x: 1 };
    const test_array = ['a', 'b', 'c'];
    const test_destructuring_array = [...test_array, 'test'];
    console.log('test_object_assign: ', test_object_assign);
    console.log('test_destructuring_object: ', test_destructuring_object);
    console.log('test_array: ', test_array);
    console.log('test_destructuring_array: ', test_destructuring_array);
  }

  render() {
    return (
      <BrowserRouter>
        <div className={`App ${styles.container}`}>
          <h1 className={styles.red}> Hello, World!</h1>
          <div onClick={this.handleClick.bind(this)}>Click Here, Count: {this.state.count}</div>
          <img className={styles.avatar} src={Avatar}/>
          <Demo onChange={(value) => console.log(value)}/>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/post">Post</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>

          <Switch>
            <Route path="/" exact component={Home}>
            </Route>
            <Route path="/post">
              <Test value="Post" />
            </Route>
            <Route path="/about">
              <Demo />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }
}

export default hot(module)(App);
