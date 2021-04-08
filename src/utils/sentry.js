import Vue from 'vue';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

export default Sentry.init({
  Vue,
  dsn: process.env.VUE_APP_SENTRY_DNS,
  integrations: [new Integrations.BrowserTracing()],
  attachProps: true,
  logErrors: false,
  environment: process.env.NODE_ENV,
  // enabled: process.env.NODE_ENV === 'production',

  tracesSampleRate: 1.0,
});
