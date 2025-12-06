import { useAppDispatch, useAppSelector } from "@/hooks/useAuth";
import {
    fetchUserNotifications,
    markNotificationAsRead,
    Notification,
} from "@/store/notificationsSlice";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function NotificationsPage() {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const { notifications, loading } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user && token) {
      dispatch(fetchUserNotifications(token));
    }
  }, [user, token]);

  const handlePress = (notification: Notification) => {
    if (!user || !token) return;

    // تعليم كمقروء
    if (!notification.readBy.includes(user._id)) {
      dispatch(markNotificationAsRead({ token, id: notification._id }));
    }

    // التوجيه إلى صفحة العنصر المرتبط إن وجد
    if (notification.relatedItem) {
      router.push(`/property/${notification.relatedItem._id}`);
    }
  };

  const renderItem = ({ item }: { item: Notification }) => {
    const isRead = user ? item.readBy.includes(user._id) : false;
    return (
      <Pressable
        style={[styles.item, isRead ? styles.read : styles.unread]}
        onPress={() => handlePress(item)}
      >
        <View style={styles.header}>
          {!isRead && <MaterialIcons name="fiber-new" size={18} color="#ff3b30" style={{ marginRight: 6 }} />}
          <Text style={[styles.title, !isRead && styles.unreadTitle]}>{item.title}</Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
        {item.relatedItem && <Text style={styles.related}>عنصر مرتبط: {item.relatedItem.title}</Text>}
      </Pressable>
    );
  };

  if (!user || loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f8f9fa' }}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff3b30',
  },
  read: {
    borderLeftWidth: 4,
    borderLeftColor: '#ccc',
    opacity: 0.7,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  title: { fontWeight: 'bold', fontSize: 16 },
  unreadTitle: { color: '#ff3b30' },
  message: { fontSize: 14, color: '#333', marginBottom: 4 },
  related: { fontSize: 13, color: '#555', fontStyle: 'italic' },
});
