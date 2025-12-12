import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  words: string[];
  onWordPress?: (word: string) => void;
  selectedWord?: string | null; // ✅ أضفنا هذه الخاصية للتحكم بالكلمة النشطة من الخارج
}

export default function MultiWordTagBox({ words, onWordPress, selectedWord }: Props) {
  const [internalActiveWord, setInternalActiveWord] = useState<string | null>(null);

  const activeWord = selectedWord !== undefined ? selectedWord : internalActiveWord;

  const handlePress = (word: string) => {
    setInternalActiveWord(word);       // إذا لم يُمرر selectedWord من الخارج
    onWordPress && onWordPress(word);
  };

  return (
    <View style={styles.box}>
      <View style={styles.inner}>
        {words.map((word, index) => {
          const isActive = activeWord === word;

          return (
            <Pressable
              key={index}
              onPress={() => handlePress(word)}
              style={[styles.wordContainer, isActive && styles.wordActive]}
            >
              <Text style={styles.word}>{word}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginRight: 8,
  },
  inner: {
    flexDirection:  'row-reverse' ,
    alignItems: 'center',
    gap: 6,
  },
  wordContainer: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  wordActive: {
    backgroundColor: 'rgba(0,150,0,0.18)',
  },
  word: {
    fontSize: 12,
    color: '#222',
  },
});
