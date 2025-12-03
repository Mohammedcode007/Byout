import { useAppDispatch, useAppSelector } from "@/hooks/useAuth";
import { updateUser } from "@/store/authSlice";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Snackbar, TextInput, Title, useTheme } from "react-native-paper";

export default function ProfileEditScreen() {
  const dispatch = useAppDispatch();
  const { user, token, loading } = useAppSelector((state) => state.auth);
  const { colors } = useTheme();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarError, setSnackbarError] = useState(false);

  const showSnackbar = (message: string, error = false) => {
    setSnackbarMessage(message);
    setSnackbarError(error);
    setSnackbarVisible(true);
  };

  const handleUpdate = async () => {
    if (!name || !phone) {
      showSnackbar("الرجاء ملء الحقول المطلوبة", true);
      return;
    }

    if (!token) {
      showSnackbar("خطأ في التوثيق", true);
      return;
    }

    try {
      const payload: any = { name, phone };
      if (oldPassword && newPassword) {
        payload.oldPassword = oldPassword;
        payload.newPassword = newPassword;
      }

      const res = await dispatch(updateUser({ token, data: payload })).unwrap();
      showSnackbar("تم تحديث البيانات بنجاح");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      showSnackbar(err || "حدث خطأ أثناء التحديث", true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
 <Title style={[styles.title, { color: '#fff' }]}>
  تعديل البيانات
</Title>
      <TextInput
        label="البريد الإلكتروني"
        value={user?.email || ""}
        style={[styles.input, { backgroundColor: colors.background }]}
        disabled
      />

      <TextInput
        label="الاسم"
        value={name}
        onChangeText={setName}
        style={[styles.input, { backgroundColor: colors.background }]}
      />

      <TextInput
        label="رقم الهاتف"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={[styles.input, { backgroundColor: colors.background }]}
      />

      <TextInput
        label="كلمة المرور الحالية"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
        style={[styles.input, { backgroundColor: colors.background }]}
      />

      <TextInput
        label="كلمة المرور الجديدة"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={[styles.input, { backgroundColor: colors.background }]}
      />

      <Button
        mode="contained"
        onPress={handleUpdate}
          labelStyle={{ color: '#fff' }} // هنا تحدد لون النص

        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        حفظ 
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        
        duration={3000}
        style={{ backgroundColor: snackbarError ? "#d32f2f" : "#388e3c" }}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "700",
    color:'#1b4414ff'
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
    backgroundColor:'#1b4414ff',
    color:'#fff'
  },
});
