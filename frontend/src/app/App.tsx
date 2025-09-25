import { AppProviders } from './providers';
import '@/assets/styles/globals.css';

/**
 * @component App
 * @summary Root React application component that initializes all providers
 * and global configurations.
 * @type root-component
 * @category application
 */
export const App = () => {
  return <AppProviders />;
};

export default App;
