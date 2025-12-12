// import i18n from '@/i18n';
// import React, { createContext, useContext, useState } from 'react';
// import { I18nManager } from 'react-native';

// interface LangContextType {
//   lang: 'en' | 'ar';
//   setLang: (lang: 'en' | 'ar') => void;
// }

// const LangContext = createContext<LangContextType>({
//   lang: 'en',
//   setLang: () => {},
// });

// export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
//   const initialLang = i18n.locale.startsWith('ar') ? 'ar' : 'en';
//   const [lang, setLangState] = useState<'en' | 'ar'>(initialLang);

//   const setLang = (newLang: 'en' | 'ar') => {
//     i18n.locale = newLang;
//     setLangState(newLang);

//     const isRTL = newLang === 'ar';
//     I18nManager.allowRTL(isRTL);
//     I18nManager.forceRTL(isRTL);
//   };

//   return (
//     <LangContext.Provider value={{ lang, setLang }}>
//       {children}
//     </LangContext.Provider>
//   );
// };

// export const useLanguage = () => useContext(LangContext);
