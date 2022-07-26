/**
 * @format
 */
import {validateName} from '../src/Utility';

describe('Testing  name validator ', () => {
  test('Correct Name', () => {
    expect(validateName('Priyansh Vatsal')).toBe(true);
  });
  test('Empty name', () => {
    expect(validateName('  ')).toStrictEqual({
      errorMessage: 'Please enter your name',
    });
  });
  test('No name', () => {
    expect(validateName('')).toStrictEqual({
      errorMessage: 'Please enter your name',
    });
  });
  test('Long Name', () => {
    expect(
      validateName(
        'Priyansh Vatsal and a very long text that should not be a name ofcourse ',
      ),
    ).toStrictEqual({
      errorMessage: 'Name can not be of more than 30 characters',
    });
  });
});
