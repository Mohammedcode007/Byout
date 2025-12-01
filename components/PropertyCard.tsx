import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

interface PropertyProps {
    images: string[];
    priceRange: { from: number; to: number };
    beds: number;
    baths: number;
    area: number;
    description: string;
    title: string;
    deliveryDate: string;
    advance: string;
    tags: string[];
}

const PropertyCard: React.FC<PropertyProps> = ({
    images,
    priceRange,
    beds,
    baths,
    area,
    description,
    title,
    deliveryDate,
    advance,
    tags,
}) => {
    const [liked, setLiked] = useState(false);
    const [sliderValue, setSliderValue] = useState(priceRange.from);

    return (
        <ScrollView style={styles.container}>
            {/* Slider للصور */}
        <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
            >
                {images.map((img, index) => (
                    <View
                        key={index}
                        style={[
                            styles.imageWrapper,
                        ]}
                    >
                        <Image source={{ uri: img }} style={styles.image} />

                        {/* Tags على الصورة */}
                        <View style={styles.tagsOnImage}>
                            {tags.map((tag, i) => (
                                <View key={i} style={styles.imageTag}>
                                    <Text style={{ color: '#fff', fontSize: 12 }}>{tag}</Text>
                                </View>
                            ))}
                        </View>

                        {/* قلب الإعجاب أسفل على اليسار */}
                        <Pressable
                            style={styles.heartIcon}
                            onPress={() => setLiked(!liked)}
                        >
                            <Ionicons name={liked ? "heart" : "heart-outline"} size={24} color="red" />
                        </Pressable>
                    </View>
                ))}
            </ScrollView>

          

            {/* معلومات العقار */}
            <View style={[styles.infoRow, { justifyContent: 'flex-end' }]}>
                <View style={styles.infoItem}>
                    <Ionicons name="bed-outline" size={16} color="#444" />
                    <Text style={styles.infoText}>{beds}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Ionicons name="water-outline" size={16} color="#444" />
                    <Text style={styles.infoText}>{baths}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Ionicons name="resize-outline" size={16} color="#444" />
                    <Text style={styles.infoText}>{area} م²</Text>
                </View>
            </View>

            {/* وصف */}
            <Text style={{ marginVertical: 10, textAlign: 'right' }}>{description}</Text>

            {/* عنوان */}
            <Text style={{ fontWeight: '700', fontSize: 16, textAlign: 'right' }}>{title}</Text>

            {/* التسليم والمقدم والسعر */}
  <View style={{ 
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 10
}}>
    {/* التسليم */}
    <View style={styles.infoTagRow}>
        <Ionicons name="calendar-outline" size={14} color="#003366" style={{ marginLeft: 4 }} />
        <Text style={styles.infoTagText}>التسليم: {deliveryDate}</Text>
    </View>

    {/* المقدم */}
    <View style={styles.infoTagRow}>
        <Ionicons name="cash-outline" size={14} color="#003366" style={{ marginLeft: 4 }} />
        <Text style={styles.infoTagText}>مقدم: {advance}</Text>
    </View>

    {/* السعر */}
    <View style={styles.infoTagRow}>
        <Ionicons name="pricetag-outline" size={14} color="#003366" style={{ marginLeft: 4 }} />
        <Text style={styles.infoTagText}>السعر: {sliderValue} جنيه</Text>
    </View>
</View>


            {/* 3 تواصل */}
            <View style={[styles.infoRow, { marginTop: 10, justifyContent: 'center' }]}>
                <Pressable style={styles.contactTag}>
                    <Ionicons name="mail-outline" size={16} color="#003366" />
                    <Text style={styles.contactText}>إيميل</Text>
                </Pressable>
                <Pressable style={styles.contactTag}>
                    <Ionicons name="call-outline" size={16} color="#003366" />
                    <Text style={styles.contactText}>اتصال</Text>
                </Pressable>
                <Pressable style={styles.contactTag}>
                    <FontAwesome name="whatsapp" size={16} color="#003366" />
                    <Text style={styles.contactText}>واتساب</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default PropertyCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageWrapper: {
        width: width - 32,
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    tagsOnImage: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row-reverse',
    },
    imageTag: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        marginLeft: 5,
    },
    heartIcon: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    infoItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginLeft: 10,
    },
    infoText: {
        marginRight: 4,
        textAlign: 'right',
    },
    contactTag: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: 'rgba(217, 248, 217, 0.7)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        marginLeft: 5,
        width: '30%',
        flex: 1,
        justifyContent: 'center'
    },
    contactText: {
    color: '#003366', // أزرق غامق
        marginRight: 5,
        textAlign: 'right',

    },
 infoTagRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.15)', // أزرق شفاف
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 6,
},

infoTagText: {
    color: '#003366', // أزرق غامق
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
},



});
