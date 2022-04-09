import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation, route }: any) => {
  const [palettes, setPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const newPalette = route.params ? route.params.newPalette : null;
  const URL = 'https://color-palette-api.kadikraman.vercel.app/palettes';

  const handleFetchPalettes = useCallback(async () => {
    const response = await fetch(URL);
    if (response.status === 200) {
      const resPalettes = await response.json();
      setPalettes(resPalettes);
    }
  }, []);

  useEffect(() => {
    handleFetchPalettes();
  }, [handleFetchPalettes]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await handleFetchPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [handleFetchPalettes]);

  useEffect(() => {
    if (newPalette) {
      setPalettes((current: any): any => [newPalette, ...current]);
    }
  }, [newPalette, handleFetchPalettes]);

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.addNewColorPalette}
        onPress={() => navigation.navigate('AddNewPaletteModal')}
      >
        <Text>Add New Color Palette</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        data={palettes}
        keyExtractor={(item: any) => item.paletteName}
        renderItem={({ item }) => (
          <PalettePreview
            onPress={() => navigation.push('ColorPalette', item)}
            palette={item}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  addNewColorPalette: {},
});

export default Home;
