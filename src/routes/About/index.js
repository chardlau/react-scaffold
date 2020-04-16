import lazy from '../../utils/lazy';

export default lazy(() => import(/* webpackChunkName: 'about' */ './About'));
