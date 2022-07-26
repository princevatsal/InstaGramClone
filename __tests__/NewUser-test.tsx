import {validateName, setUserDetails, getUserDetails} from '../src/Utility';

describe('Adding New User', () => {
  test('Add correct new user', () => {
    return expect(
      setUserDetails('Test user 2', '+911234567891', '223'),
    ).resolves.toBe('success');
  });
  test('Adding new user without phone no', () => {
    return expect(setUserDetails('Test user 2', '  ', '223')).rejects.toBe(
      'error',
    );
  });
  test('Adding new user without name', () => {
    return expect(setUserDetails('', '+919870617494', '223')).rejects.toBe(
      'error',
    );
  });
  test('Adding new user without uid', () => {
    return expect(setUserDetails('Cool', '+919870617494', '')).rejects.toBe(
      'error',
    );
  });
});
