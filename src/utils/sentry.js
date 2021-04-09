import Vue from 'vue';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

export default Sentry.init({
  Vue,
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  attachProps: true,
  logErrors: false,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV !== 'development',

  tracesSampleRate: 1.0,
});
