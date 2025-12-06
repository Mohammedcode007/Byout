import { editProperty, fetchProperty, PropertyData } from "@/store/propertieSlice";
import { AppDispatch, RootState } from "@/store/store";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

type AmenityKey =
  | "water" | "electricity" | "sauna" | "jacuzzi" | "childcare" | "steam"
  | "garbage_disposal" | "phone_line" | "garden" | "cafeteria" | "maintenance" | "pool" | "gym" | "hospital";

const amenityLabels: Record<AmenityKey, string> = {
  water: "مياه", electricity: "كهرباء", sauna: "ساونا", jacuzzi: "جاكوزي",
  childcare: "رعاية أطفال", steam: "غرفة بخار", garbage_disposal: "تصريف قمامة",
  phone_line: "خط هاتف", garden: "حديقة", cafeteria: "كافيتريا",
  maintenance: "صيانة", pool: "حمام سباحة", gym: "جيم (صالة رياضية)",
  hospital: "مستشفى قريب",
};

const propertyTypes = ["apartment", "villa", "room", "student_housing"];
const transactionTypes = ["sale", "rent"];
const suitableOptions = ["male", "female", "mixed"];
const statusTypes = ["مكتمل", "قيد الانشاء"];
const ownershipTypes = ["owned", "rented", "student_housing"];
const countries = ["مصر"];
const citiesByCountry: Record<string, string[]> = { مصر: ["القاهرة", "الجيزة", "الإسكندرية", "المنصورة", "أسوان", "الفيوم"] };
const districtsByCity: Record<string, string[]> = {
  القاهرة: ["مدينة نصر", "الزمالك", "المهندسين", "المقطم"],
  الجيزة: ["الهرم", "الدقي", "الجيزة الجديدة"],
  الإسكندرية: ["سموحة", "المعمورة", "بحري"],
  المنصورة: ["شرق المنصورة", "غرب المنصورة"],
  أسوان: ["مدينة أسوان", "أبو سمبل"],
  الفيوم: ["المدينة", "سنورس"],
};

export default function EditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const property = useSelector((state: RootState) => state.property.property);
console.log(token);

  const [form, setForm] = useState({
    title: "", description: "", type: "", installmentMonths: "",
    transactionType: "", price: "", advancePayment: "", country: "مصر",
    city: "", district: "", street: "", postalCode: "", address: "",
    lat: "", lng: "", suitableFor: "mixed", area: "", bedrooms: "",
    bathrooms: "", furnished: false, phone: "", email: "", deliveryDate: "",
    featured: false, status: "", ownership: "",
    amenities: Object.fromEntries(Object.keys(amenityLabels).map(k => [k, false])) as Record<AmenityKey, boolean>,
    images: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  useEffect(() => {
    if (id) dispatch(fetchProperty(id));
  }, [id]);

  // عندما يتم جلب البيانات، نعبي الفورم
  useEffect(() => {
    if (property) {
      setForm({
        title: property.title,
        description: property.description || "",
        type: property.type,
        installmentMonths: property.installmentMonths?.toString() || "",
        transactionType: property.transactionType === "للبيع" ? "sale" : "rent",
        price: property.price.toString(),
        advancePayment: property.advancePayment?.toString() || "",
        country: property.location.country || "مصر",
        city: property.location.city || "",
        district: property.location.district || "",
        street: property.location.street || "",
        postalCode: property.location.postalCode || "",
        address: property.location.address || "",
        lat: property.location.coordinates?.lat?.toString() || "",
        lng: property.location.coordinates?.lng?.toString() || "",
        suitableFor: property.suitableFor || "mixed",
        area: property.area?.toString() || "",
        bedrooms: property.bedrooms?.toString() || "",
        bathrooms: property.bathrooms?.toString() || "",
        furnished: property.furnished || false,
        phone: property.contact?.phone || "",
        email: property.contact?.email || "",
        deliveryDate: property.deliveryDate ? property.deliveryDate.slice(0, 7) : "",
        featured: property.featured || false,
        status: property.status === 'ready' ? 'مكتمل' : 'قيد الانشاء',
        ownership: property.ownership || "",
        amenities: property.amenities || Object.fromEntries(Object.keys(amenityLabels).map(k => [k, false])),
        images: property.images?.join(",") || "",
      });
    }
  }, [property]);

  const handleChange = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));
  const toggleAmenity = (key: AmenityKey) => setForm(prev => ({ ...prev, amenities: { ...prev.amenities, [key]: !prev.amenities[key] } }));

  const handleCityChange = (city: string) => {
    setForm(prev => ({ ...prev, city, district: "" }));
    setAvailableDistricts(districtsByCity[city] || []);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) handleChange("deliveryDate", `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`);
  };

  const handleSubmit = () => {
    if (!token) return Alert.alert("خطأ", "يجب تسجيل الدخول لتعديل العقار");

    const imageArray = form.images ? form.images.split(",").map(i => i.trim()) : [];
    if (imageArray.length > 10) return Alert.alert("تنبيه", "الحد الأقصى المسموح به هو 10 صور فقط.");

    const payload: Partial<PropertyData> = {
      title: form.title,
      description: form.description || undefined,
      type: form.type as "apartment" | "villa" | "room" | "student_housing",
      installmentMonths: Number(form.installmentMonths),
      transactionType: form.transactionType === "sale" ? "للبيع" : "للايجار",
      price: Number(form.price),
      advancePayment: form.advancePayment ? Number(form.advancePayment) : undefined,
      location: {
        country: form.country,
        city: form.city,
        district: form.district || undefined,
        street: form.street || undefined,
        postalCode: form.postalCode || undefined,
        address: form.address,
        coordinates: { lat: Number(form.lat), lng: Number(form.lng) }
      },
      suitableFor: form.suitableFor as "male" | "female" | "mixed",
      area: form.area ? Number(form.area) : undefined,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
      furnished: form.furnished,
      contact: form.phone || form.email ? { phone: form.phone || undefined, email: form.email || undefined } : undefined,
      deliveryDate: form.deliveryDate ? new Date(form.deliveryDate + "-01").toISOString() : undefined,
      featured: form.featured,
      status: form.status === "completed" ? "مكتمل" : "قيد الانشاء",
      ownership: form.ownership as "owned" | "rented" | "student_housing",
      amenities: form.amenities,
      images: imageArray,
    };

    dispatch(editProperty({ token, id, data: payload }))
      .unwrap()
      .then(() => {
        Alert.alert("نجاح", "تم تعديل العقار بنجاح");
        router.back();
      })
      .catch(err => Alert.alert("خطأ", String(err)));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={styles.pageTitle}>تعديل العقار</Text>

        {renderInput("عنوان العقار", "title", form.title, handleChange)}
        {renderInput("الوصف", "description", form.description, handleChange, true)}
        {renderDropdown("نوع العقار", form.type, propertyTypes, val => handleChange("type", val))}
        {renderDropdown("نوع العملية", form.transactionType, transactionTypes, val => handleChange("transactionType", val))}
        {renderInput("السعر", "price", form.price, handleChange, false, "numeric")}
        {renderInput("المقدم", "advancePayment", form.advancePayment, handleChange, false, "numeric")}
        {renderInput("عدد أشهر التقسيط", "installmentMonths", form.installmentMonths, handleChange, false, "numeric")}

        <Text style={styles.section}>بيانات الموقع</Text>
        {renderDropdown("الدولة", form.country, countries, val => { handleChange("country", val); handleChange("city", ""); handleChange("district", ""); })}
        {renderDropdown("المدينة", form.city, form.country ? citiesByCountry[form.country] || [] : [], handleCityChange)}
        {renderDropdown("الحي / المركز", form.district, availableDistricts, val => handleChange("district", val))}
        {renderInput("الشارع", "street", form.street, handleChange)}
        {renderInput("الرمز البريدي", "postalCode", form.postalCode, handleChange)}
        {renderInput("العنوان التفصيلي", "address", form.address, handleChange)}
        {renderInput("خط العرض (lat)", "lat", form.lat, handleChange, false, "numeric")}
        {renderInput("خط الطول (lng)", "lng", form.lng, handleChange, false, "numeric")}

        {renderDropdown("السكن مناسب لـ", form.suitableFor, suitableOptions, val => handleChange("suitableFor", val))}
        {renderInput("المساحة (م²)", "area", form.area, handleChange, false, "numeric")}
        {renderInput("عدد الغرف", "bedrooms", form.bedrooms, handleChange, false, "numeric")}
        {renderInput("عدد الحمامات", "bathrooms", form.bathrooms, handleChange, false, "numeric")}
        <Text style={styles.label}>مفروش</Text>
        <Switch value={form.furnished} onValueChange={() => handleChange("furnished", !form.furnished)} />

        {renderInput("رقم الهاتف", "phone", form.phone, handleChange)}
        {renderInput("البريد الإلكتروني", "email", form.email, handleChange)}

        <Text style={styles.label}>تاريخ التسليم (شهر/سنة)</Text>
        <Pressable style={[styles.input, { justifyContent: "center" }]} onPress={() => setShowDatePicker(true)}>
          <Text>{form.deliveryDate || "اختر الشهر والسنة"}</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={form.deliveryDate ? new Date(form.deliveryDate + "-01") : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        {renderDropdown("الحالة", form.status, statusTypes, val => handleChange("status", val))}
        {renderDropdown("نوع الملكية", form.ownership, ownershipTypes, val => handleChange("ownership", val))}
        <Text style={styles.label}>عقار مميز؟</Text>
        <Switch value={form.featured} onValueChange={() => handleChange("featured", !form.featured)} />

        <Text style={styles.section}>الخدمات والمرافق</Text>
        {Object.keys(form.amenities).map(key => (
          <View key={key} style={styles.amenityRow}>
            <Text style={styles.label2}>{amenityLabels[key as AmenityKey]}</Text>
            <Switch value={form.amenities[key as AmenityKey]} onValueChange={() => toggleAmenity(key as AmenityKey)} />
          </View>
        ))}

        {renderInput("روابط الصور (افصل بينهم بـ , ولا يزيد عن 10)", "images", form.images, handleChange)}

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>حفظ التعديلات</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ======= مساعد الحقول ======= */
const renderInput = (label: string, key: string, value: string, onChange: Function, multiline = false, keyboard: any = "default") => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={v => onChange(key, v)}
      style={[styles.input, multiline ? { height: 100, textAlignVertical: "top" } : null]}
      placeholder={label}
      multiline={multiline}
      keyboardType={keyboard}
    />
  </>
);

const renderDropdown = (label: string, value: string, items: string[], onChange: (val: string) => void) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.pickerWrapper}>
      <Picker selectedValue={value} onValueChange={onChange} style={{ height: 55, width: "100%" }}>
        <Picker.Item label={`اختر ${label}`} value="" />
        {items.map(item => <Picker.Item key={item} label={item} value={item} />)}
      </Picker>
    </View>
  </View>
);

const styles = StyleSheet.create({
  pageTitle: { fontSize: 22, fontWeight: "700", marginBottom: 20, color: "#2e7d32", textAlign: "center" },
  label: { fontSize: 15, fontWeight: "600", marginTop: 12, marginBottom: 6, color: "#333" },
  label2: { fontSize: 14, fontWeight: "500", color: "#333" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#c8e6c9", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  section: { marginTop: 20, fontSize: 18, fontWeight: "700", color: "#2e7d32" },
  amenityRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#eee" },
  submitBtn: { backgroundColor: "#2e7d32", paddingVertical: 14, borderRadius: 12, marginTop: 30, marginBottom: 30 },
  submitText: { color: "#fff", fontWeight: "700", textAlign: "center", fontSize: 16 },
  pickerWrapper: { borderWidth: 1, borderColor: "#c8e6c9", borderRadius: 10, overflow: "hidden" },
});
