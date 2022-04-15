import { groupBy } from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { useAppContext } from '../App.provider';

const Analytics: React.FC = () => {
  const appContext = useAppContext();
  const data = Object.entries(groupBy(appContext.moodList, 'mood.emoji')).map(
    ([key, value]) => ({ x: key, y: value.length }),
  );
  return (
    <View style={styles.container}>
      <VictoryPie data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Analytics;
