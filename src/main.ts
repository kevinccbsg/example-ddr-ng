import { bootstrapApplication } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';

if (isDevMode()) {
  const { initTWD } = await import('twd-js/bundled');
  const tests = {
    './twd-tests/helloWorld.twd.test.ts': () => import('./twd-tests/helloWorld.twd.test'),
    './twd-tests/todoList.twd.test.ts': () => import('./twd-tests/todoList.twd.test'),
  };
  initTWD(tests);
  const { createBrowserClient } = await import('twd-relay/browser');
  const client = createBrowserClient({
    url: 'ws://localhost:9876/__twd/ws',
  });
  client.connect();
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
