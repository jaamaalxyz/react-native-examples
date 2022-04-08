import { StyleSheet, Text, View } from 'react-native';

interface Props {
  hexCode: string;
  colorName: string;
}

const ColorBox = ({ hexCode, colorName }: Props) => {
  return (
    <View style={[styles.colorBox, { backgroundColor: hexCode }]}>
      <Text style={styles.text}>
        {colorName}: {hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  colorBox: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 5,
    color: '#efe',
  },
});

export default ColorBox;
