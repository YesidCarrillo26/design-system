import { Provider } from 'react-redux';
import { InboxScreen } from './components/InboxScreen';
import { makeStore } from './store/store';

const store = makeStore();

export function App() {
  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  );
}
