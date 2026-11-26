import React, { useState } from 'react';
import { View, Image, Text, Pressable, StyleSheet, Platform } from 'react-native';

// Los sprites SIEMPRE 400X240 para que se stacken bien
const EMOTIONS = {
  Neutral: require('./assets/Neutral.png'),
  Sad: require('./assets/Sad.png'),
  Happy: require('./assets/Happy.png'),
};

const DIRT = {
  Limpio: null,
  Low: require('./assets/DirtyLowl.png'),
  High: require('./assets/DirtyHigh.png'),
};

const W = 400;
const H = 240;
const SCALE = 0.8; // 320x192 en la pantalla 

const pixelArt = {
  width: W * SCALE,
  height: H * SCALE,
  position: 'absolute',
  resizeMode: 'stretch',
  ...(Platform.OS === 'web' ? { imageRendering: 'pixelated' } : {}),
};

function Button({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.btn, active && styles.btnActive]}
    >
      <Text style={[styles.btnText, active && styles.btnTextActive]}>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [emotion, setEmotion] = useState('Neutral');
  const [dirt, setDirt] = useState('Clean');

  const emotionKeys = Object.keys(EMOTIONS);
  const dirtKeys = Object.keys(DIRT);

  const cycle = (keys, current, set) =>
    set(keys[(keys.indexOf(current) + 1) % keys.length]);

  return (
    <View style={styles.container}>
      {/* Sprite stack: Emocion abajo (la base) y los efectos irian arriba, ocupo checar que onda por si luego hay overstacks de efectos*/}
      <View style={{ width: W * SCALE, height: H * SCALE }}>
        <Image source={EMOTIONS[emotion]} style={pixelArt} fadeDuration={0} resizeMethod="scale" />
        {DIRT[dirt] && (
          <Image source={DIRT[dirt]} style={pixelArt} fadeDuration={0} resizeMethod="scale" />
        )}
      </View>

      <Text style={styles.heading}>Emocion</Text>
      <View style={styles.row}>
        {emotionKeys.map((k) => (
          <Button key={k} label={k} active={emotion === k} onPress={() => setEmotion(k)} />
        ))}
      </View>
      <Button label="Emociones: " onPress={() => cycle(emotionKeys, emotion, setEmotion)} />

      <Text style={styles.heading}>Suciedad</Text>
      <View style={styles.row}>
        {dirtKeys.map((k) => (
          <Button key={k} label={k} active={dirt === k} onPress={() => setDirt(k)} />
        ))}
      </View>
      <Button label="Efectos: " onPress={() => cycle(dirtKeys, dirt, setDirt)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b3a',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
  },
  heading: { color: '#ccc', fontSize: 16, marginTop: 18 },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#444458',
  },
  btnActive: { backgroundColor: '#f0c674' },
  btnText: { color: '#fff', fontSize: 15 },
  btnTextActive: { color: '#222', fontWeight: '600' },
});