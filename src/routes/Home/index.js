import lazy from '../../utils/lazy';
export default lazy(() => import(/* webpackChunkName: 'home' */ './Home'));
