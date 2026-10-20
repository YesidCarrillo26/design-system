import { createContext, useContext } from 'react';

/**
 * `true` dentro de un `SettingsGroup`: el grupo dibuja los separadores entre filas, así que
 * cada `ListItem` omite su borde inferior.
 */
export const ListItemGroupContext = createContext(false);

export const useInListItemGroup = () => useContext(ListItemGroupContext);
