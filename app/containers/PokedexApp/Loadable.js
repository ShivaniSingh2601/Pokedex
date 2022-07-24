/**
 *
 * Asynchronously loads the component for PokedexApp
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
