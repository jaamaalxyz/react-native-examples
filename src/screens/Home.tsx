import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation }: any) => {
  const [palettes, setPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await handleFetchPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [handleFetchPalettes]);

  return (
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
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default Home;
