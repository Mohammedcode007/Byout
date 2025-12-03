
import ActivityCard from '@/components/ActivityCard';
import MoreItem from '@/components/MoreItem';
import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
import i18n, { loadLocale, setLocale } from '@/i18n';
import { logout } from '@/store/authSlice';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Updates from 'expo-updates';
import React, { useContext, useEffect, useState } from 'react';
import { Animated, I18nManager, Image, Modal, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollYContext } from './_layout';

export default function MoreScreen() {
  const scrollY = useContext(ScrollYContext); // استخدم الـ scrollY من Context
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const { user, token, loading } = useAppSelector((state) => state.auth);
const colorScheme = useColorScheme(); // 'light' أو 'dark'
  const isDark = colorScheme === 'dark';
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'ar'>(i18n.locale.startsWith('ar') ? 'ar' : 'en');

  useEffect(() => {
    const init = async () => {
      try {
        const direction = await loadLocale();
        const isRTL = direction === "rtl";

        if (I18nManager.isRTL !== isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);
          await Updates.reloadAsync();
        }

        const current = i18n.locale.startsWith('ar') ? 'ar' : 'en';
        setSelectedLang(current);
      } catch (err) {
        console.log('Error during init:', err);
      }
    };
    init();
  }, []);

  const changeLanguage = async (lang: 'en' | 'ar') => {
    try {
      await setLocale(lang);
      i18n.locale = lang;
      setSelectedLang(lang);
      setLanguageModalVisible(false);

      const newIsRTL = lang === 'ar';
      if (I18nManager.isRTL !== newIsRTL) {
        I18nManager.allowRTL(newIsRTL);
        I18nManager.forceRTL(newIsRTL);
        await Updates.reloadAsync();
      }
    } catch (err) {
      console.log('Error changing language:', err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff' }}>
      <Animated.ScrollView
        style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff', paddingTop: 20 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: 'https://st2.depositphotos.com/1001877/10342/i/450/depositphotos_103428244-stock-photo-house-and-loupe-magnifying-glass.jpg' }}
            style={styles.headerImage}
          />

          {!isLoggedIn ? (
            <Button
              mode="contained"
              style={[styles.loginButton, { backgroundColor: isDark ? '#6c5ce7' : '#1b4414ff' }]}
              labelStyle={{ color: isDark ? '#fff' : '#fff' }}
              onPress={() => router.push('/Login')}
            >
              تسجيل دخول
            </Button>
          ) : (
            <View style={[styles.loggedInContainer, { backgroundColor: isDark ? '#1f1f1f' : '#fff' }]}>
              <Text style={[styles.welcomeText, { color: isDark ? '#fff' : '#222' }]}>
                أهلاً بيك مرة تانيه يا {user?.name}
              </Text>
              <Pressable onPress={() => dispatch(logout())} style={[styles.logoutButton, { backgroundColor: isDark ? '#333' : '#f5f5f5' }]}>
                <Ionicons name="log-out-outline" size={28} color={isDark ? '#ff5252' : '#d32f2f'} />
              </Pressable>
            </View>
          )}
        </View>

        <View style={{ marginBottom: 100 }}>
          <ActivityCard onPress={() => console.log('Activity card pressed!')} />
          <Text style={[styles.header, { color: isDark ? '#fff' : '#222' }]}>{i18n.t('discover_more')}</Text>
          <MoreItem icon="person-circle-outline" title={i18n.t('profile')} onPress={() => {}} iconOpacity={0.4} />
          <MoreItem
            icon="settings-outline"
            title={i18n.t('settings')}
            iconOpacity={0.4}
            onPress={() => router.push("/updateUser")}
          />
          <MoreItem icon="notifications-outline" title={i18n.t('notifications')} onPress={() => {}} iconOpacity={0.4} />
          <MoreItem icon="language-outline" title={i18n.t('language')} onPress={() => setLanguageModalVisible(true)} iconOpacity={0.4} />
          <MoreItem icon="newspaper-outline" title={i18n.t('blog')} onPress={() => {}} iconOpacity={0.4} />
          <MoreItem icon="call-outline" title={i18n.t('contact')} onPress={() => {}} iconOpacity={0.4} />
          <MoreItem icon="information-circle-outline" title={i18n.t('about')} onPress={() => {}} iconOpacity={0.4} />
          <MoreItem icon="shield-checkmark-outline" title={i18n.t('privacy')} onPress={() => {}} iconOpacity={0.4} />
          <MoreItem icon="log-out-outline" title={i18n.t('log_out')} onPress={() => dispatch(logout())} iconOpacity={0.4} />
        </View>

        {/* Modal اختيار اللغة */}
        <Modal visible={languageModalVisible} transparent animationType="slide" onRequestClose={() => setLanguageModalVisible(false)}>
          <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <View style={[styles.modalContent, { backgroundColor: isDark ? '#222' : '#F7F8FA' }]}>
              <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#1F1F1F' }]}>{i18n.t('select_language')}</Text>

              {(['en', 'ar'] as const).map((lang) => (
                <Pressable
                  key={lang}
                  onPress={() => changeLanguage(lang)}
                  style={[styles.langButton, selectedLang === lang && styles.langButtonSelected, { backgroundColor: selectedLang === lang ? '#4A90E2' : isDark ? '#333' : '#E0E4FF' }]}
                >
                  <Text style={[styles.langText, selectedLang === lang && styles.langTextSelected, { color: selectedLang === lang ? '#fff' : isDark ? '#fff' : '#1F1F1F' }]}>
                    {lang === 'en' ? 'English' : 'العربية'}
                  </Text>
                </Pressable>
              ))}

              <Pressable onPress={() => setLanguageModalVisible(false)} style={styles.closeButton}>
                <Text style={{ color: '#4A90E2', fontWeight: '600' }}>
                  {selectedLang === 'ar' ? 'إغلاق' : 'Close'}
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: { marginBottom: 20, alignItems: 'center' },
  headerImage: { width: '100%', height: 180 },
  loginButton: { marginTop: -20, backgroundColor: '#1b4414ff', alignSelf: 'center', paddingHorizontal: 30, width: '80%' },
  header: { fontSize: 22, fontWeight: '700', color: '#222', marginBottom: 25, paddingHorizontal: 20, textAlign: I18nManager.isRTL ? 'right' : 'left' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  modalContent: { width: '85%', backgroundColor: '#F7F8FA', borderRadius: 25, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 15, alignItems: 'center' },
  modalTitle: { fontSize: 22, fontWeight: '700', marginBottom: 20, color: '#1F1F1F', textAlign: 'center' },
  langButton: { width: '100%', paddingVertical: 14, borderRadius: 18, marginVertical: 8, alignItems: 'center', backgroundColor: '#E0E4FF' },
  langText: { fontSize: 16, color: '#1F1F1F', fontWeight: '500' },
  langButtonSelected: { backgroundColor: '#4A90E2' },
  langTextSelected: { color: '#fff', fontWeight: '600' },
  closeButton: { marginTop: 20, paddingVertical: 12, paddingHorizontal: 40, borderRadius: 20, borderWidth: 1, borderColor: '#4A90E2', backgroundColor: '#fff' },
  loggedInContainer: { borderColor:'grey',borderWidth:0.5,flexDirection: 'row', alignItems: 'center', marginTop: -20, justifyContent: 'center', backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20, borderRadius: 25 },
  welcomeText: { fontSize: 16, fontWeight: '600', marginRight: 10, color: '#222' },
  logoutButton: { padding: 4, borderRadius: 8, backgroundColor: '#f5f5f5' },

});
