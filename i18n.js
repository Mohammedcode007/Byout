
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Localization from 'expo-localization';
// import { I18n } from 'i18n-js';

// const i18n = new I18n();

// // الترجمات
// i18n.translations = {
//   en: {
//     profile: "Profile",
//     settings: "Settings",
//     notifications: "Notifications",
//     language: "Language",
//     blog: "Blog",
//     contact: "Contact Us",
//     about: "About",
//     privacy: "Privacy Policy",
//     discover_more: "Discover More About Beit",
//     select_language: "Select Language",
//   },
//   ar: {
//     profile: "الملف الشخصي",
//     settings: "الإعدادات",
//     notifications: "الإشعارات",
//     language: "اللغة",
//     blog: "المدونة",
//     contact: "اتصل بنا",
//     about: "نبذة عنا",
//     privacy: "سياسات الخصوصية",
//     discover_more: "اكتشف المزيد عن بيوت",
//     select_language: "اختر اللغة",
//   },
// };

// // اللغة الافتراضية
// i18n.defaultLocale = "en";
// i18n.enableFallback = true;

// // تحميل اللغة من AsyncStorage
// export const loadLocale = async () => {
//   try {
//     const savedLocale = await AsyncStorage.getItem("appLanguage");
//     if (savedLocale) {
//       i18n.locale = savedLocale;
//     } else {
//       // إذا لا يوجد لغة محفوظة، استخدم لغة الجهاز
//       const deviceLocale = Localization.locale || "en";
//       i18n.locale = deviceLocale.split("-")[0];
//     }
//   } catch (error) {
//     console.log("Error loading locale:", error);
//   }
// };

// // حفظ اللغة بعد التغيير
// export const setLocale = async (locale) => {
//   try {
//     await AsyncStorage.setItem("appLanguage", locale);
//     i18n.locale = locale;
//   } catch (error) {
//     console.log("Error saving locale:", error);
//   }
// };

// export default i18n;

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n();

i18n.translations = {
  en: {
    profile: "Profile",
    settings: "Settings",
    notifications: "Notifications",
    language: "Language",
    blog: "Blog",
    contact: "Contact Us",
    about: "About",
    privacy: "Privacy Policy",
    discover_more: "Discover More About Beit",
    select_language: "Select Language",
  },
  ar: {
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    notifications: "الإشعارات",
    language: "اللغة",
    blog: "المدونة",
    contact: "اتصل بنا",
    about: "نبذة عنا",
    privacy: "سياسات الخصوصية",
    discover_more: "اكتشف المزيد عن بيوت",
    select_language: "اختر اللغة",
  },
};

i18n.defaultLocale = "en";
i18n.enableFallback = true;

// تحميل اللغة + الاتجاه
export const loadLocale = async () => {
  try {
    const savedLocale = await AsyncStorage.getItem("appLanguage");
    const savedDirection = await AsyncStorage.getItem("appDirection");

    if (savedLocale) {
      i18n.locale = savedLocale;
    } else {
      const deviceLocale = Localization.locale || "en";
      i18n.locale = deviceLocale.split("-")[0];
    }

    return savedDirection === "rtl" ? "rtl" : "ltr";

  } catch (error) {
    console.log("Error loading locale:", error);
    return "ltr";
  }
};

// حفظ اللغة + الاتجاه
export const setLocale = async (locale) => {
  try {
    await AsyncStorage.setItem("appLanguage", locale);

    const direction = locale === "ar" ? "rtl" : "ltr";
    await AsyncStorage.setItem("appDirection", direction);

    i18n.locale = locale;
  } catch (error) {
    console.log("Error saving locale:", error);
  }
};

export default i18n;
