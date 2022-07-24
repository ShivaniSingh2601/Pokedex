/*
 * PokedexApp Messages
 *
 * This contains all the text for the PokedexApp container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PokedexApp';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the PokedexApp container!',
  },
});
