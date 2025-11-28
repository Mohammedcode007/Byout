// app/(tabs)/more.tsx
import MoreItem from '@/components/MoreItem';
import i18n from '@/i18n';
import * as Updates from 'expo-updates';
import React, { useState } from 'react';
import { I18nManager, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export default function MoreScreen() {
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const initialLang = i18n.locale && i18n.locale.startsWith('ar') ? 'ar' : 'en';
  const [selectedLang, setSelectedLang] = useState<'en' | 'ar'>(initialLang);

  const changeLanguage = async (lang: 'en' | 'ar') => {
    i18n.locale = lang;
    setSelectedLang(lang);
    setLanguageModalVisible(false);

    const isRTL = lang === 'ar';

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      await Updates.reloadAsync();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 20 }}>
      <Text style={styles.header}>{i18n.t('discover_more')}</Text>

      <MoreItem icon="person-circle-outline" title={i18n.t('profile')} onPress={() => {}} iconOpacity={0.4} />
      <MoreItem icon="settings-outline" title={i18n.t('settings')} onPress={() => {}} iconOpacity={0.4} />
      <MoreItem icon="notifications-outline" title={i18n.t('notifications')} onPress={() => {}} iconOpacity={0.4} />

      <MoreItem
        icon="language-outline"
        title={i18n.t('language')}
        onPress={() => setLanguageModalVisible(true)}
        iconOpacity={0.4}
      />

      <MoreItem icon="newspaper-outline" title={i18n.t('blog')} onPress={() => {}} iconOpacity={0.4} />
      <MoreItem icon="call-outline" title={i18n.t('contact')} onPress={() => {}} iconOpacity={0.4} />
      <MoreItem icon="information-circle-outline" title={i18n.t('about')} onPress={() => {}} iconOpacity={0.4} />
      <MoreItem icon="shield-checkmark-outline" title={i18n.t('privacy')} onPress={() => {}} iconOpacity={0.4} />

      <Modal
        visible={languageModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{i18n.t('select_language')}</Text>

           {(['en', 'ar'] as const).map((lang) => (
  <Pressable
    key={lang}
    onPress={() => changeLanguage(lang)}
    style={[
      styles.langButton,
      selectedLang === lang && styles.langButtonSelected,
    ]}
  >
    <Text
      style={[
        styles.langText,
        selectedLang === lang && styles.langTextSelected,
      ]}
    >
      {lang === 'en' ? 'English' : 'العربية'}
    </Text>
  </Pressable>
))}


            <Pressable onPress={() => setLanguageModalVisible(false)} style={styles.closeButton}>
              <Text style={{ color: '#4A90E2', fontWeight: '600' }}>إغلاق</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 25,
    paddingHorizontal: 20,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
 modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // خلفية شفافة ناعمة
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#F7F8FA', // لون فاتح هادي
    borderRadius: 25, // أكثر سموزي
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1F1F1F',
    textAlign: 'center',
  },
  langButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 18,
    marginVertical: 8,
    alignItems: 'center',
    backgroundColor: '#E0E4FF', // لون أزرق فاتح هادي
  },
  langText: {
    fontSize: 16,
    color: '#1F1F1F',
    fontWeight: '500',
  },
  langButtonSelected: {
    backgroundColor: '#4A90E2', // أزرق بارز عند التحديد
  },
  langTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
    backgroundColor: '#fff',
  },
});
