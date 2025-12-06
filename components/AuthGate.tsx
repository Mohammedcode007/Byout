

// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React from 'react';
// import { Pressable, StyleSheet, View } from 'react-native';
// import { Card, Paragraph, Title } from 'react-native-paper';

// // تعريف أسماء الشاشات الموجودة في Stack
// export type RootStackParamList = {
//   '(tabs)': undefined;
//   modal: undefined;
//   Register: undefined; // شاشة تسجيل مستخدم جديد
// };

// interface AuthGateProps {
//   onGoogleLogin?: () => void;
//   onFacebookLogin?: () => void;
//   children: React.ReactNode;
// }

// export default function AuthGate({
//   onGoogleLogin,
//   onFacebookLogin,
//   children,
// }: AuthGateProps) {
//   // تحديد نوع التنقل
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const handleLogin = () => {
//     // الانتقال إلى شاشة تسجيل مستخدم جديد
//     navigation.navigate('Register');
//   };

//   const handleGoogleLogin = () => {
//     if (onGoogleLogin) onGoogleLogin();
//   };

//   const handleFacebookLogin = () => {
//     if (onFacebookLogin) onFacebookLogin();
//   };

//   return (
//     <View style={styles.container}>
//       <Card style={styles.card}>
//         <Card.Content>
//           <Title style={styles.title}>تسجيل الدخول للوصول</Title>
//           <Paragraph style={styles.paragraph}>
//             الرجاء تسجيل الدخول للمتابعة. يمكنك استخدام حساب جديد أو حساب Google/Facebook.
//           </Paragraph>

//           <Pressable style={styles.option} onPress={handleLogin}>
//             <Ionicons name="person-outline" size={20} color="#6c5ce7" />
//             <Paragraph style={styles.optionText}>تسجيل مستخدم جديد</Paragraph>
//           </Pressable>

//           <Pressable style={styles.option} onPress={handleGoogleLogin}>
//             <MaterialCommunityIcons name="google" size={20} color="#f0932b" />
//             <Paragraph style={styles.optionText}>تسجيل دخول بجوجل</Paragraph>
//           </Pressable>

//           <Pressable style={styles.option} onPress={handleFacebookLogin}>
//             <MaterialCommunityIcons name="facebook" size={20} color="#0984e3" />
//             <Paragraph style={styles.optionText}>تسجيل دخول بفيسبوك</Paragraph>
//           </Pressable>
//         </Card.Content>
//       </Card>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#f9f9f9' },
//   card: { width: '90%', borderRadius: 12, elevation: 3 },
//   title: { textAlign: 'center', marginBottom: 10, color: '#333' },
//   paragraph: { textAlign: 'center', marginBottom: 20, color: '#555' },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     marginVertical: 6,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: 'transparent',
//   },
//   optionText: { color: '#555', fontSize: 16, marginLeft: 8, textAlign: 'center' },
// });

import { useAppSelector } from '@/hooks/useAuth';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

// تعريف أسماء الشاشات الموجودة في Stack
export type RootStackParamList = {
  '(tabs)': undefined;
  modal: undefined;
  Register: undefined;
};

interface AuthGateProps {
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  children: React.ReactNode;
}

export default function AuthGate({
  onGoogleLogin,
  onFacebookLogin,
  children,
}: AuthGateProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // جلب حالة تسجيل الدخول
  const { isLoggedIn,token } = useAppSelector(state => state.auth);

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleGoogleLogin = () => {
    if (onGoogleLogin) onGoogleLogin();
  };

  const handleFacebookLogin = () => {
    if (onFacebookLogin) onFacebookLogin();
  };

  // إذا كان المستخدم مسجل دخول، عرض المحتوى مباشرة
  if (token) {
    return <>{children}</>;
  }

  // إذا غير مسجل، عرض بطاقة تسجيل الدخول
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>تسجيل الدخول للوصول</Title>
          <Paragraph style={styles.paragraph}>
            الرجاء تسجيل الدخول للمتابعة. يمكنك استخدام حساب جديد أو حساب Google/Facebook.
          </Paragraph>

          <Pressable style={styles.option} onPress={handleRegister}>
            <Ionicons name="person-outline" size={20} color="#6c5ce7" />
            <Paragraph style={styles.optionText}>تسجيل مستخدم جديد</Paragraph>
          </Pressable>

          <Pressable style={styles.option} onPress={handleGoogleLogin}>
            <MaterialCommunityIcons name="google" size={20} color="#f0932b" />
            <Paragraph style={styles.optionText}>تسجيل دخول بجوجل</Paragraph>
          </Pressable>

          <Pressable style={styles.option} onPress={handleFacebookLogin}>
            <MaterialCommunityIcons name="facebook" size={20} color="#0984e3" />
            <Paragraph style={styles.optionText}>تسجيل دخول بفيسبوك</Paragraph>
          </Pressable>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#f9f9f9' },
  card: { width: '90%', borderRadius: 12, elevation: 3 },
  title: { textAlign: 'center', marginBottom: 10, color: '#333' },
  paragraph: { textAlign: 'center', marginBottom: 20, color: '#555' },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  optionText: { color: '#555', fontSize: 16, marginLeft: 8, textAlign: 'center' },
});
