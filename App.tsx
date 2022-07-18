/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StyleSheet ,SafeAreaView} from 'react-native';
import Home from "./src/screens/Home";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Home/>
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
  container:{
    flex:1
  }
})
export default App;
