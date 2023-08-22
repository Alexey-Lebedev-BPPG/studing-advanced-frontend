/* eslint-disable no-await-in-loop */
// файл для дев сервера
import ESBuild from 'esbuild';
import { config } from './esbuild-config';

// чтоб не ругалось на то, что await используется только в async функциях, оборачиваем все в самовызывающуюся асинхронную функцию
(async () => {
  const PORT = Number(process.env?.port) || 5000;

  const server = await ESBuild.context(config);

  await server.watch();

  await server
    .rebuild()
    .then(() => console.log('build...'))
    .catch(err => console.log('', err));

  await server
    .serve({ port: PORT, servedir: config.outdir })
    .then(() => console.log(`server started on http://localhost:${PORT}`))
    .catch(err => console.log('error esbuild dev server', err));
})();

// new EventSource('/esbuild').addEventListener('change', () => location.reload());
