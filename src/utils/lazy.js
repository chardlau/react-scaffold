import React from 'react';
import importedComponent from 'react-imported-component';

import Loading from '../components/Loading';

function Error () {
  return (
    <div>加载模块失败，请检查网络</div>
  )
}

export default function lazy (loader) {
  return importedComponent(loader, {
    LoadingComponent: Loading,
    ErrorComponent: Error
  });
}
