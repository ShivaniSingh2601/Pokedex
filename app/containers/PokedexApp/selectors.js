import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pokedexApp state domain
 */

const selectPokedexAppDomain = state => state.pokedexApp || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PokedexApp
 */

const makeSelectPokedexApp = () =>
  createSelector(
    selectPokedexAppDomain,
    substate => substate,
  );

export default makeSelectPokedexApp;
export { selectPokedexAppDomain };
