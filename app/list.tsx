import { useAppDispatch, useAppSelector } from "@/hooks/useAuth";
import { fetchProperties, removeProperty } from "@/store/propertieSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function PropertyListScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { properties, loading, error } = useAppSelector((state) => state.property);
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();

  const [searchCity, setSearchCity] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(fetchProperties({}));
  }, []);

  // فلترة البيانات محليًا
  const filteredProperties = properties.filter((p) => {
    return (
      (!searchCity || p.location.city.includes(searchCity)) &&
      (!searchCountry || p.location.country.includes(searchCountry)) &&
      (!searchPrice || p.price <= Number(searchPrice))
    );
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const currentData = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: string) => {
    if (!token) return Alert.alert("خطأ", "يجب تسجيل الدخول");
    Alert.alert("تأكيد", "هل تريد حذف هذا العقار؟", [
      { text: "إلغاء", style: "cancel" },
      {
        text: "حذف",
        style: "destructive",
        onPress: () => dispatch(removeProperty({ token, id }))
      }
    ]);
  };

const handleEdit = (id: string) => {
  router.push({ pathname: "/edit", params: { id } });
};

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>الدولة: {item.location.country}</Text>
        <Text>المدينة: {item.location.city}</Text>
        <Text>السعر: {item.price}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={() => handleEdit(item._id)}>
          <Ionicons name="pencil" size={24} color="#2e7d32" />
        </Pressable>
        <Pressable onPress={() => handleDelete(item._id)} style={{ marginTop: 8 }}>
          <Ionicons name="trash" size={24} color="red" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* بحث */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="بحث بالمدينة"
          value={searchCity}
          onChangeText={setSearchCity}
          style={styles.searchInput}
        />
        <TextInput
          placeholder="بحث بالدولة"
          value={searchCountry}
          onChangeText={setSearchCountry}
          style={styles.searchInput}
        />
        <TextInput
          placeholder="بحث بالسعر أقل من"
          value={searchPrice}
          onChangeText={setSearchPrice}
          style={styles.searchInput}
          keyboardType="numeric"
        />
      </View>

      {loading && <Text>جاري التحميل...</Text>}
      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <FlatList
        data={currentData}
        keyExtractor={(item) => item._id!}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#eee", marginVertical: 8 }} />}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        <Pressable
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((prev) => prev - 1)}
          style={[styles.pageBtn, currentPage === 1 && { opacity: 0.5 }]}
        >
          <Text>السابق</Text>
        </Pressable>
        <Text style={{ marginHorizontal: 8 }}>{currentPage} / {totalPages}</Text>
        <Pressable
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage((prev) => prev + 1)}
          style={[styles.pageBtn, currentPage === totalPages && { opacity: 0.5 }]}
        >
          <Text>التالي</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", padding: 12, backgroundColor: "#f9f9f9", borderRadius: 10 },
  title: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
  actions: { justifyContent: "center", alignItems: "center" },
  searchRow: { flexDirection: "row", marginBottom: 16, justifyContent: "space-between" },
  searchInput: { flex: 1, borderWidth: 1, borderColor: "#c8e6c9", borderRadius: 10, paddingHorizontal: 8, marginHorizontal: 4, height: 40 },
  pagination: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 12 },
  pageBtn: { paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: "#2e7d32", borderRadius: 8 },
});
