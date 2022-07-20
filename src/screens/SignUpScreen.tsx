import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';

const SignUpScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Sign Up </Text>
    </SafeAreaView>
  );
};
const styles = {
  container: {
    flex: 1,
  },
};

export default SignUpScreen;
