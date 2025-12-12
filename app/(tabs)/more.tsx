
import ActivityCard from '@/components/ActivityCard';
import MoreItem from '@/components/MoreItem';
import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
import { logout } from '@/store/authSlice';
import { clearFavoritesState } from '@/store/favoritesSlice';
import { fetchUserNotifications } from '@/store/notificationsSlice';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Animated, Image, Modal, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
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
  const [blogVisible, setBlogVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);




  

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearFavoritesState());

  };

  const { notifications } = useAppSelector((state) => state.notifications);

  useEffect(() => {
    if (user && token) {
      dispatch(fetchUserNotifications(token));
    }
  }, [user, token]);

  const unreadCount = notifications.filter(n => !n.readBy.includes(user?._id)).length;

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

          {!isLoggedIn && !token ? (
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
                  أهلاً بيك مرة تانيه يا   {user?.name}

              </Text>
              <Pressable onPress={handleLogout} style={[styles.logoutButton, { backgroundColor: isDark ? '#333' : '#f5f5f5' }]}>
                <Ionicons name="log-out-outline" size={28} color={isDark ? '#ff5252' : '#d32f2f'} />
              </Pressable>
            </View>
          )}
        </View>

        <View style={{ marginBottom: 100 }}>
          <ActivityCard onPress={() => console.log('Activity card pressed!')} />
          <Text style={[styles.header, { color: isDark ? '#fff' : '#222' }]}>اكتشف المزيد</Text>
          <MoreItem icon="person-circle-outline" title='الملف الشخصي' onPress={() => { }} iconOpacity={0.4} />
          <MoreItem
            icon="settings-outline"
            title='الضبط'
            iconOpacity={0.4}
            onPress={() => router.push("/updateUser")}
          />
          <MoreItem icon="notifications-outline" title='الاشعارات' onPress={() => router.push("/notifications")} iconOpacity={0.4} />
          <MoreItem icon="newspaper-outline" title='المدونه' onPress={() => setBlogVisible(true)} iconOpacity={0.4} />
          <MoreItem icon="call-outline" title='اتصل بنا' onPress={() => setContactVisible(true)} iconOpacity={0.4} />
          <MoreItem icon="information-circle-outline" title='من نحن' onPress={() => setAboutVisible(true)} iconOpacity={0.4} />
          <MoreItem icon="shield-checkmark-outline" title='الخصوصيه' onPress={() => setPrivacyVisible(true)} iconOpacity={0.4} />
          {token && (
            <MoreItem
              icon="log-out-outline"
              title='تسجيل خروج'
              onPress={handleLogout}
              iconOpacity={0.4}
            />
          )}

        </View>

    
        {/* ===== Modal: Blog ===== */}
        <Modal visible={blogVisible} transparent animationType="slide" onRequestClose={() => setBlogVisible(false)}>
          <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
            <View style={[styles.modalContent, { backgroundColor: isDark ? '#222' : '#fff' }]}>
              <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#000' }]}>ألمدونه</Text>
              <Text style={{ color: isDark ? '#ccc' : '#333', textAlign: 'center', lineHeight: 22 }}>
                  يمكنك هنا قراءة أحدث المقالات وأخبار التطبيق.
              </Text>

              <Pressable onPress={() => setBlogVisible(false)} style={styles.closeButton}>
                <Text style={{ color: '#4A90E2' }}>إغلاق</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* ===== Modal: Contact ===== */}
        <Modal visible={contactVisible} transparent animationType="slide" onRequestClose={() => setContactVisible(false)}>
          <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
            <View style={[styles.modalContent, { backgroundColor: isDark ? '#222' : '#fff' }]}>
              <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#000' }]}>اتصل بنا</Text>
              <Text style={{ color: isDark ? '#ccc' : '#333', textAlign: 'center' }}>
                للتواصل معنا: support@example.com
              </Text>

              <Pressable onPress={() => setContactVisible(false)} style={styles.closeButton}>
                <Text style={{ color: '#4A90E2' }}>إغلاق</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* ===== Modal: About ===== */}
        <Modal visible={aboutVisible} transparent animationType="slide" onRequestClose={() => setAboutVisible(false)}>
          <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
            <View style={[styles.modalContent, { backgroundColor: isDark ? '#222' : '#fff' }]}>
              <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#000' }]}>من نحن</Text>
              <Text style={{ color: isDark ? '#ccc' : '#333', textAlign: 'center' }}>
                 هذا التطبيق يساعدك في البحث عن أفضل العقارات بسهولة
              </Text>

              <Pressable onPress={() => setAboutVisible(false)} style={styles.closeButton}>
                <Text style={{ color: '#4A90E2' }}>إغلاق</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* ===== Modal: Privacy ===== */}
        <Modal visible={privacyVisible} transparent animationType="slide" onRequestClose={() => setPrivacyVisible(false)}>
          <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
            <View style={[styles.modalContent, { backgroundColor: isDark ? '#222' : '#fff' }]}>
              <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#000' }]}>الخصوصيه</Text>
              <Text style={{ color: isDark ? '#ccc' : '#333', textAlign: 'center' }}>
               نحن نحترم خصوصيتك ولا نشارك بياناتك مع أطراف خارجية
              </Text>

              <Pressable onPress={() => setPrivacyVisible(false)} style={styles.closeButton}>
                <Text style={{ color: '#4A90E2' }}>إغلاق</Text>
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
  header: { fontSize: 22, fontWeight: '700', color: '#222', marginBottom: 25, paddingHorizontal: 20, textAlign: 'right' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  modalContent: { width: '85%', backgroundColor: '#F7F8FA', borderRadius: 25, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 15, alignItems: 'center' },
  modalTitle: { fontSize: 22, fontWeight: '700', marginBottom: 20, color: '#1F1F1F', textAlign: 'center' },
  langButton: { width: '100%', paddingVertical: 14, borderRadius: 18, marginVertical: 8, alignItems: 'center', backgroundColor: '#E0E4FF' },
  langText: { fontSize: 16, color: '#1F1F1F', fontWeight: '500' },
  langButtonSelected: { backgroundColor: '#4A90E2' },
  langTextSelected: { color: '#fff', fontWeight: '600' },
  closeButton: { marginTop: 20, paddingVertical: 12, paddingHorizontal: 40, borderRadius: 20, borderWidth: 1, borderColor: '#4A90E2', backgroundColor: '#fff' },
  loggedInContainer: { borderColor: 'grey', borderWidth: 0.5, flexDirection: 'row', alignItems: 'center', marginTop: -20, justifyContent: 'center', backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20, borderRadius: 25 },
  welcomeText: { fontSize: 16, fontWeight: '600', marginRight: 10, color: '#222' },
  logoutButton: { padding: 4, borderRadius: 8, backgroundColor: '#f5f5f5' },

});
