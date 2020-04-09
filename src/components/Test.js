import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from './Test.m.less';

export default function Test(props) {
  const [user, setUser] = useState({});
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    axios.get('/api/user').then((res) => {
      setUser(res.data);
    }).catch(() => {
    });
  }, []);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div className={styles.container}>
      This is {value}, <span className={styles.text}>Hello {(user || {}).name}</span>!
    </div>
  )
}

