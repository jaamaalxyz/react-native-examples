import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';
import { MoodOptionTypeWithTimestamp } from '../types';

const History = () => {
  const appContext = useAppContext();
  return (
    <ScrollView style={styles.container}>
      {appContext.moodList.map((item: MoodOptionTypeWithTimestamp) => (
        <MoodItemRow key={item.timestamp} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default History;
