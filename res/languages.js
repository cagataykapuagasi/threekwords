import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import translations from 'res/translations';
import { I18nManager } from 'react-native';

I18n.translations = translations;
const locale = RNLocalize.findBestAvailableLanguage(Object.keys(I18n.translations)) || {
  isRTL: false,
  languageTag: 'en',
};
I18nManager.forceRTL(locale.isRTL);
I18n.locale = locale.languageTag;
I18n.defaultLocale = 'en';
I18n.fallbacks = true;

export default I18n;
