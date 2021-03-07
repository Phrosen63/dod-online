import VueI18n from 'vue-i18n';
import Vue from 'vue';

// Import language files
import en from './locales/en.js';
import sv from './locales/sv.js';

Vue.use(VueI18n);

const DEFAULT_LOCALE = 'en';
const FALLBACK_LOCALE = 'sv';

export default new VueI18n({
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages: {
    en,
    sv,
  },
});
