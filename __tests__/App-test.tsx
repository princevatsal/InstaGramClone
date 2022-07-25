/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import firestore from '@react-native-firebase/firestore';
import {validateName} from '../src/Utility';

console.log(firestore);
describe('Testing  name validator ', () => {
  it('Correct Name', () => {
    expect(validateName('Priyansh Vatsal')).toBe(true);
  });

  it('Empty name', () => {
    expect(validateName('  ')).toStrictEqual({
      errorMessage: 'Please enter your name',
    });
  });

  it('No name', () => {
    expect(validateName('')).toStrictEqual({
      errorMessage: 'Please enter your name',
    });
  });

  it('Long Name', () => {
    expect(
      validateName(
        'Priyansh Vatsal and a very long text that should not be a name ofcourse ',
      ),
    ).toStrictEqual({
      errorMessage: 'Name can not be of more than 30 characters',
    });
  });
});
