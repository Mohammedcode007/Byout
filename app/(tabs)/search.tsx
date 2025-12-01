import LocationBar from '@/components/LocationBar';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters from '@/components/SearchFilters';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const properties = [
    {
      id: 1,
      images: [
        'https://www.contemporist.com/wp-content/uploads/2017/05/modern-house-design-swimming-pool-160517-950-01-800x533.jpg',
        'https://res.cloudinary.com/stannard-homes/image/fetch/c_fill,g_auto,f_auto,dpr_auto,w_1170,h_617/https://stannard-homes-assets.s3.ap-southeast-2.amazonaws.com/app/uploads/2021/09/19134557/042.jpg',
      ],
      priceRange: { from: 1000, to: 5000 },
      beds: 3,
      baths: 2,
      area: 120,
      description: 'شقة رائعة بموقع ممتاز.',
      title: 'شقة للبيع في القاهرة',
      deliveryDate: '12/2025',
      advance: '200,000',
      tags: ['قيد الإنشاء', 'مميز'],
    },
    {
      id: 2,
      images: [
        'https://www.thithithara.com/storage/property/images/2656_image_1708220798.jpg',
        'https://futurestiles.com/wp-content/uploads/2024/11/Black-Elegant-Interior-Design-Presentation-2024-11-23T181925.075-2.jpg',
      ],
      priceRange: { from: 2000, to: 6000 },
      beds: 4,
      baths: 3,
      area: 180,
      description: 'فيلا فاخرة بالقرب من البحر.',
      title: 'فيلا للبيع في الإسكندرية',
      deliveryDate: '06/2026',
      advance: '500,000',
      tags: ['مميز'],
    },
  ];
  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* شريط الموقع */}
      <LocationBar
        onSelectLocation={() => console.log("اختيار الموقع")}
        onSaveLocation={() => console.log("تم حفظ الموقع")}
      />

      {/* الفلاتر */}
    <View 
>
    <SearchFilters
      onFilterPress={(label) => console.log("اخترت:", label)}
      onClearFilters={() => console.log("تم مسح الفلاتر")}
    />
  </View>

      {/* ScrollView ياخد باقي المساحة */}
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50, }}>
          {properties.map((property) => (
            <View key={property.id} style={{ marginBottom: 20 }}>
              <PropertyCard
                images={property.images}
                priceRange={property.priceRange}
                beds={property.beds}
                baths={property.baths}
                area={property.area}
                description={property.description}
                title={property.title}
                deliveryDate={property.deliveryDate}
                advance={property.advance}
                tags={property.tags}
              />
            </View>
          ))}
        </ScrollView>
    </SafeAreaView>

  );
}
