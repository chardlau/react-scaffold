import React from 'react';

export default React.lazy(() => import(/* webpackChunkName: 'post' */ './Post'));
