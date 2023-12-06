import { createRoot } from 'react-dom/client';
import { RootProviders } from './app/providers/RootProviders';
import App from '@/app/App';
// импортим конфиг переводов
import '@/shared/config/i18n/i18n';
// импорт глобальных стилей
import './app/styles/index.css';

// для горячей перезагрузки
new EventSource('/build-esbuild').addEventListener('change', () =>
  // eslint-disable-next-line no-restricted-globals
  location.reload(),
);

const container = document.getElementById('root');

if (!container) throw new Error('Error load app');

const root = createRoot(container);

root.render(
  <RootProviders>
    <App />
  </RootProviders>,
);
