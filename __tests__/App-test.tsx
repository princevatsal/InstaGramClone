/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import firestore from '@react-native-firebase/firestore';

it('renders correctly', () => {
  console.log(firestore, 'dd');
  // renderer.create(<App />);
});
