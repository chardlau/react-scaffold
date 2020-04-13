import {hot} from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import Home from './routes/Home';
import Post from './routes/Post';
import About from './routes/About';
import Loading from './components/Loading';

import Avatar from './assets/avatar.jpeg';

import styles from './styles/App.m.less';
import './styles/App.css';

function App() {
  const test_object_assign = Object.assign({}, { a: 123 });
  const test_destructuring_object = { ...test_object_assign, x: 1 };
  const test_array = ['a', 'b', 'c'];
  const test_destructuring_array = [...test_array, 'test'];
  console.log('test_object_assign: ', test_object_assign);
  console.log('test_destructuring_object: ', test_destructuring_object);
  console.log('test_array: ', test_array);
  console.log('test_destructuring_array: ', test_destructuring_array);

  return (
    <BrowserRouter>
      <div className={`App ${styles.container}`}>
        <img className={styles.avatar} src={Avatar}/>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/post">
              <Post />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default hot(App);
