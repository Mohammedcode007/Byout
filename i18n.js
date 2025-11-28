import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n();

// الترجمات
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

// اللغة الافتراضية
i18n.defaultLocale = "en";

// اللغة الحالية — مع حماية من undefined
const deviceLocale = Localization.locale || "en";
i18n.locale = String(deviceLocale).split("-")[0]; // يحول ar-EG → ar

// fallback
i18n.enableFallback = true;

export default i18n;
