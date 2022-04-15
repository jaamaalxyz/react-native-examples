import React, { useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '../theme';
import { MoodOptionType } from '../types';

const butterflies = require('../../assets/butterflies.png');

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

interface MoodPickerProps {
  onSelect: (mood: MoodOptionType) => void;
}

const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  const [hasSelectedMood, setHasSelectedMood] = useState(false);

  const handleSelect = useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelectedMood(true);
    }
  }, [onSelect, selectedMood]);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedMood ? withTiming(1) : 0.8 }],
    }),
    [selectedMood],
  );

  return (
    <>
      {hasSelectedMood ? (
        <HasSelectedView setHasSelectedMood={setHasSelectedMood} />
      ) : (
        <MoodListView
          setSelectedMood={setSelectedMood}
          selectedMood={selectedMood}
          handleSelect={handleSelect}
          buttonStyle={buttonStyle}
        />
      )}
    </>
  );
};

const HasSelectedView: React.FC<any> = ({ setHasSelectedMood }) => (
  <View style={styles.container}>
    <Image style={styles.image} source={butterflies} />
    <Pressable style={styles.button} onPress={() => setHasSelectedMood(false)}>
      <Text style={styles.buttonText}>Back</Text>
    </Pressable>
  </View>
);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MoodListView: React.FC<any> = ({
  setSelectedMood,
  selectedMood,
  handleSelect,
  buttonStyle,
}) => (
  <View style={styles.moodList}>
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map((option) => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              style={[
                styles.moodItem,
                option.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text style={styles.moodText}>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === option.emoji ? option.description : ' '}
            </Text>
          </View>
        ))}
      </View>
      <AnimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </AnimatedPressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  moodText: {
    fontSize: 24,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyBold,
    fontSize: 10,
    textAlign: 'center',
  },
  container: {
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    height: 230,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  heading: {
    fontSize: 20,
    fontFamily: theme.fontFamilyBold,
    color: theme.colorWhite,
    letterSpacing: 1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
  },
});

export default MoodPicker;
