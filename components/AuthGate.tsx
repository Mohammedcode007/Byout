import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

interface AuthGateProps {
  onLogin?: () => void;
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  children: React.ReactNode;
}

export default function AuthGate({
  onLogin,
  onGoogleLogin,
  onFacebookLogin,
  children,
}: AuthGateProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // تحقق من حالة تسجيل الدخول من AsyncStorage أو Context
  }, []);

  const handleLogin = () => {
    if (onLogin) onLogin();
    else setIsLoggedIn(true);
  };

  const handleGoogleLogin = () => {
    if (onGoogleLogin) onGoogleLogin();
    else setIsLoggedIn(true);
  };

  const handleFacebookLogin = () => {
    if (onFacebookLogin) onFacebookLogin();
    else setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>تسجيل الدخول للوصول</Title>
            <Paragraph style={styles.paragraph}>
              الرجاء تسجيل الدخول للمتابعة. يمكنك استخدام حساب جديد أو حساب Google/Facebook.
            </Paragraph>

            <Pressable style={styles.option} onPress={handleLogin}>
              <Ionicons name="person-outline" size={20} color="#6c5ce7" />
              <Paragraph style={styles.optionText}>تسجيل دخول جديد</Paragraph>
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

  return <>{children}</>;
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
