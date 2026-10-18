import { addons } from 'storybook/manager-api';
import { dark, light } from './theme';

// El panel sigue la preferencia del sistema y reacciona si cambia mientras está abierto.
const query = window.matchMedia('(prefers-color-scheme: dark)');
const apply = () => addons.setConfig({ theme: query.matches ? dark : light });

apply();
query.addEventListener('change', () => {
  apply();
  // El tema del manager solo se relee al recargar.
  window.location.reload();
});
