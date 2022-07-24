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

describe('Testing validators', () => {
  it('Name validator', () => {
    expect(validateName('Priyansh Vatsal')).toBe(true);
  });
});
