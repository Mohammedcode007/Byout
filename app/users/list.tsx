
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { fetchUserById, fetchUsers, removeUser, updateUser as updateUserThunk } from '@/store/usersSlice';
// import { Ionicons } from '@expo/vector-icons';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function AdminUsersPage() {
//   const dispatch = useAppDispatch();
//   const { users, loading, pages } = useAppSelector(state => state.users);
//   const token = useAppSelector(state => state.auth.token);

//   // States
//   const [page, setPage] = useState(1);
//   const [nameKeyword, setNameKeyword] = useState('');
//   const [roleKeyword, setRoleKeyword] = useState('');
//   const [editingUser, setEditingUser] = useState<any>(null);
//   const [isEditingOpen, setIsEditingOpen] = useState(false);
//   const [saving, setSaving] = useState(false);

//   // Fetch users whenever page or search changes
//   useEffect(() => {
//     if (!token) return;

//     const params: any = {
//       page,
//       limit: 3,
//     };

//     if (nameKeyword) params.name = nameKeyword;  // backend يجب أن يدعم name
//     if (roleKeyword) params.role = roleKeyword;

//     dispatch(fetchUsers({ token, params }));
//   }, [token, page, nameKeyword, roleKeyword]);

//   // فتح مودال تعديل الدور
//   const openEdit = async (id: string) => {
//     if (!token) return;
//     setSaving(false);
//     await dispatch(fetchUserById({ token, id }));
//     setEditingUser(users.find(u => u._id === id));
//     setIsEditingOpen(true);
//   };

//   // حفظ الدور المعدل
//   const handleSave = async () => {
//     if (!token || !editingUser) return;
//     setSaving(true);
//     await dispatch(updateUserThunk({
//       token,
//       id: editingUser._id,
//       data: { role: editingUser.role }
//     }));
//     setIsEditingOpen(false);
//     setEditingUser(null);
//     setSaving(false);

//     // إعادة تحميل الصفحة الحالية بعد التحديث
//     dispatch(fetchUsers({ token, params: { page, limit: 3, name: nameKeyword || undefined, role: roleKeyword || undefined } }));
//   };

//   // حذف مستخدم
//   const handleDelete = async (id: string) => {
//     if (!token) return;
//     await dispatch(removeUser({ token, id }));
//     // إعادة تحميل الصفحة بعد الحذف
//     dispatch(fetchUsers({ token, params: { page, limit: 3, name: nameKeyword || undefined, role: roleKeyword || undefined } }));
//   };

//   // عرض كل مستخدم في الصف
//   const renderItem = ({ item, index }: any) => (
//     <View style={[styles.row, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.role}>{item.role}</Text>
//       <View style={styles.actions}>
//         <TouchableOpacity onPress={() => openEdit(item._id)}>
//           <Ionicons name="pencil" size={22} color="#2196F3" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleDelete(item._id)}>
//           <Ionicons name="trash" size={22} color="#F44336" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // Pagination
//   const renderPagination = () => (
//     <View style={styles.pagination}>
//       <TouchableOpacity
//         style={[styles.pageButton, page === 1 && styles.disabled]}
//         disabled={page === 1}
//         onPress={() => setPage(prev => Math.max(prev - 1, 1))}
//       >
//         <Text style={styles.pageText}>‹</Text>
//       </TouchableOpacity>

//       <Text style={styles.pageNumber}>{page} / {pages}</Text>

//       <TouchableOpacity
//         style={[styles.pageButton, page === pages && styles.disabled]}
//         disabled={page === pages}
//         onPress={() => setPage(prev => Math.min(prev + 1, pages))}
//       >
//         <Text style={styles.pageText}>›</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>إدارة المستخدمين</Text>

//       {/* البحث */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           placeholder="بحث بالاسم"
//           style={styles.searchInput}
//           value={nameKeyword}
//           onChangeText={text => { setNameKeyword(text); setPage(1); }}
//         />
//         <TextInput
//           placeholder="بحث بالدور"
//           style={styles.searchInput}
//           value={roleKeyword}
//           onChangeText={text => { setRoleKeyword(text); setPage(1); }}
//         />
//       </View>

//       {renderPagination()}

//       {/* قائمة المستخدمين */}
//       {loading ? (
//         <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
//       ) : (
//         <FlatList
//           data={users}
//           keyExtractor={(item) => item._id || Math.random().toString()}
//           renderItem={renderItem}
//         />
//       )}

//       {/* تعديل الدور */}
//       <Modal visible={isEditingOpen} animationType="slide" transparent>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>تعديل الدور</Text>
//             <TextInput
//               style={styles.input}
//               value={editingUser?.role}
//               onChangeText={text => setEditingUser({ ...editingUser, role: text })}
//               placeholder="الدور"
//             />
//             <View style={styles.modalActions}>
//               <TouchableOpacity style={[styles.button, { backgroundColor: '#9E9E9E' }]} onPress={() => { setIsEditingOpen(false); setEditingUser(null); }}>
//                 <Text style={styles.buttonText}>إلغاء</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.button} onPress={handleSave}>
//                 <Text style={styles.buttonText}>{saving ? 'جاري الحفظ...' : 'حفظ'}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
//   title: { fontSize: 26, fontWeight: 'bold', marginBottom: 12, color: '#333', textAlign: 'center' },
//   searchContainer: { flexDirection: 'row', gap: 8, marginBottom: 12 },
//   searchInput: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
//   row: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 8, marginBottom: 6 },
//   rowEven: { backgroundColor: '#E8F5E9' },
//   rowOdd: { backgroundColor: '#FFFFFF' },
//   name: { flex: 2, fontSize: 16, fontWeight: '500', color: '#212121' },
//   role: { flex: 1, fontSize: 14, color: '#555' },
//   actions: { flexDirection: 'row', gap: 12 },
//   pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 12, gap: 12 },
//   pageButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#2196F3', borderRadius: 6 },
//   disabled: { backgroundColor: '#B0BEC5' },
//   pageText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
//   pageNumber: { fontSize: 16, fontWeight: 'bold' },
//   modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
//   modalContent: { backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 12 },
//   modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
//   input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
//   modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
//   button: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6 },
//   buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
// });
import { sendNotification } from '@/store/notificationsSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchUserById, fetchUsers, removeUser, updateUser as updateUserThunk } from '@/store/usersSlice';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AdminUsersPage() {
  const dispatch = useAppDispatch();
  const { users, loading: usersLoading, pages } = useAppSelector(state => state.users);
  const token = useAppSelector(state => state.auth.token);

  // States
  const [page, setPage] = useState(1);
  const [nameKeyword, setNameKeyword] = useState('');
  const [roleKeyword, setRoleKeyword] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isEditingOpen, setIsEditingOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null); // Loading عند حذف مستخدم
  const [sendingNotification, setSendingNotification] = useState(false);

  // States اختيار المستخدمين
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  // Fetch users
  useEffect(() => {
    if (!token) return;

    const params: any = { page, limit: 3 };
    if (nameKeyword) params.name = nameKeyword;
    if (roleKeyword) params.role = roleKeyword;

    dispatch(fetchUsers({ token, params }));
  }, [token, page, nameKeyword, roleKeyword]);

  // فتح مودال تعديل الدور
  const openEdit = async (id: string) => {
    if (!token) return;
    setSaving(false);
    await dispatch(fetchUserById({ token, id }));
    setEditingUser(users.find(u => u._id === id));
    setIsEditingOpen(true);
  };

  // حفظ الدور المعدل
  const handleSave = async () => {
    if (!token || !editingUser) return;
    setSaving(true);
    await dispatch(updateUserThunk({ token, id: editingUser._id, data: { role: editingUser.role } }));
    setIsEditingOpen(false);
    setEditingUser(null);
    setSaving(false);
    dispatch(fetchUsers({ token, params: { page, limit: 3, name: nameKeyword || undefined, role: roleKeyword || undefined } }));
  };

  // حذف مستخدم
  const handleDelete = async (id: string) => {
    if (!token) return;
    setDeletingId(id);
    await dispatch(removeUser({ token, id }));
    setDeletingId(null);
    dispatch(fetchUsers({ token, params: { page, limit: 3, name: nameKeyword || undefined, role: roleKeyword || undefined } }));
  };

  // Toggle اختيار المستخدم
  const toggleUserSelection = (id: string) => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]);
  };

  // تحديد/إلغاء تحديد الكل
  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      const allIds: string[] = users.map(u => u._id).filter((id): id is string => !!id);
      setSelectedUsers(allIds);
    }
  };

  // إرسال إشعار للمستخدمين المحددين
  const handleSendNotification = async () => {
    if (!token || selectedUsers.length === 0) return;

    setSendingNotification(true);
    await dispatch(sendNotification({
      token,
      data: { title: notificationTitle, message: notificationMessage, recipientIds: selectedUsers }
    }));
    setSendingNotification(false);

    setIsNotificationModalOpen(false);
    setNotificationTitle('');
    setNotificationMessage('');
    setSelectedUsers([]);
  };

  // عرض كل مستخدم
  const renderItem = ({ item, index }: any) => (
    <View style={[styles.row, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
      <TouchableOpacity onPress={() => toggleUserSelection(item._id)} style={{ marginRight: 10 }}>
        <Text>{selectedUsers.includes(item._id) ? '☑️' : '⬜'}</Text>
      </TouchableOpacity>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => openEdit(item._id)}>
          {saving && editingUser?._id === item._id ? (
            <ActivityIndicator size="small" color="#2196F3" />
          ) : (
            <Ionicons name="pencil" size={22} color="#2196F3" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          {deletingId === item._id ? (
            <ActivityIndicator size="small" color="#F44336" />
          ) : (
            <Ionicons name="trash" size={22} color="#F44336" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  // Pagination
  const renderPagination = () => (
    <View style={styles.pagination}>
      <TouchableOpacity style={[styles.pageButton, page === 1 && styles.disabled]} disabled={page === 1} onPress={() => setPage(prev => Math.max(prev - 1, 1))}>
        <Text style={styles.pageText}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.pageNumber}>{page} / {pages}</Text>
      <TouchableOpacity style={[styles.pageButton, page === pages && styles.disabled]} disabled={page === pages} onPress={() => setPage(prev => Math.min(prev + 1, pages))}>
        <Text style={styles.pageText}>›</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إدارة المستخدمين</Text>

      {/* البحث */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="بحث بالاسم" style={styles.searchInput} value={nameKeyword} onChangeText={text => { setNameKeyword(text); setPage(1); }} />
        <TextInput placeholder="بحث بالدور" style={styles.searchInput} value={roleKeyword} onChangeText={text => { setRoleKeyword(text); setPage(1); }} />
      </View>

      {/* زر تحديد الكل */}
      <TouchableOpacity onPress={toggleSelectAll} style={{ marginBottom: 10 }}>
        <Text>{selectedUsers.length === users.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}</Text>
      </TouchableOpacity>

      {/* زر إرسال إشعار */}
      {selectedUsers.length > 0 && (
        <TouchableOpacity style={[styles.button, { marginBottom: 12 }]} onPress={() => setIsNotificationModalOpen(true)}>
          {sendingNotification ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>إرسال إشعار للمحدد</Text>}
        </TouchableOpacity>
      )}

      {renderPagination()}

      {/* قائمة المستخدمين */}
      {usersLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <FlatList data={users} keyExtractor={item => item._id || Math.random().toString()} renderItem={renderItem} />
      )}

      {/* تعديل الدور */}
      <Modal visible={isEditingOpen} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>تعديل الدور</Text>
            <TextInput style={styles.input} value={editingUser?.role} onChangeText={text => setEditingUser({ ...editingUser, role: text })} placeholder="الدور" />
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#9E9E9E' }]} onPress={() => { setIsEditingOpen(false); setEditingUser(null); }}>
                <Text style={styles.buttonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>حفظ</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* إرسال إشعار */}
      <Modal visible={isNotificationModalOpen} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>إرسال إشعار</Text>
            <TextInput style={styles.input} placeholder="العنوان" value={notificationTitle} onChangeText={setNotificationTitle} />
            <TextInput style={[styles.input, { height: 100 }]} placeholder="الرسالة" multiline value={notificationMessage} onChangeText={setNotificationMessage} />
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#9E9E9E' }]} onPress={() => setIsNotificationModalOpen(false)}>
                <Text style={styles.buttonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSendNotification}>
                {sendingNotification ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>إرسال</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles كما هي سابقاً


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 12, color: '#333', textAlign: 'center' },
  searchContainer: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  searchInput: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 8, marginBottom: 6 },
  rowEven: { backgroundColor: '#E8F5E9' },
  rowOdd: { backgroundColor: '#FFFFFF' },
  name: { flex: 2, fontSize: 16, fontWeight: '500', color: '#212121' },
  role: { flex: 1, fontSize: 14, color: '#555' },
  actions: { flexDirection: 'row', gap: 12 },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 12, gap: 12 },
  pageButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#2196F3', borderRadius: 6 },
  disabled: { backgroundColor: '#B0BEC5' },
  pageText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  pageNumber: { fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 12 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  button: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6 },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});
