import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  visibleFilter: string | null;
  onClose: () => void;
  data: Record<string, string>;
}

export default function BottomSheetFilter({ visibleFilter, onClose, data }: Props) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['40%', '70%'], []);

  useEffect(() => {
    if (visibleFilter) {
      bottomSheetModalRef.current?.present();
    }
  }, [visibleFilter]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onDismiss={onClose}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{visibleFilter}</Text>
        <Text>{visibleFilter ? data[visibleFilter] : ''}</Text>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },
});
