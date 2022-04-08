import { FlatList, StyleSheet, Text } from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({ route }: any) => {
  const { colors } = route.params;

  const renderItems = ({ item }: any) => (
    <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
  );

  return (
    <FlatList
      style={styles.container}
      data={colors}
      keyExtractor={(item) => item.hexCode}
      renderItem={renderItems}
      ListFooterComponent={<Text style={styles.footer}>End of List</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default ColorPalette;
