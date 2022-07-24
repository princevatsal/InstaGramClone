/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import Intro from '../intro';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {validateName} from '../src/Utility';

describe('Testing  name validator ', () => {
  it('Correct Name', () => {
    expect(validateName('Priyansh Vatsal')).toBe(true);
  });
  it('Empty name', () => {
    expect(validateName('  ')).toStrictEqual({
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
