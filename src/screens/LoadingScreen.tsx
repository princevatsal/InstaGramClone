import React from 'react';
import {ActivityIndicator, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoadingScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container as ViewStyle}>
      <ActivityIndicator size={30} color="blue" />
    </SafeAreaView>
  );
};
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default LoadingScreen;
