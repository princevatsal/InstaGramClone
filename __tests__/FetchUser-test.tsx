import {validateName, setUserDetails, getUserDetails} from '../src/Utility';

describe('Fetching User details', () => {
  test('Fetching correct user', () => {
    return expect(getUserDetails('+918864994682')).resolves.toStrictEqual({
      name: 'Prince Vatsal',
      phoneNo: '+918864994682',
      uid: '12356',
    });
  });
  test('Fetching correct user2', () => {
    return expect(getUserDetails('+911234567890')).resolves.toStrictEqual({
      name: 'Test User',
      phoneNo: '+911234567890',
      uid: '1234',
    });
  });
  test('Fetching user with wrong phone no', () => {
    return expect(getUserDetails('+91124647')).rejects.toBe(
      'no user exists with this phone no',
    );
  });
  test('Fetching user with no phone no', () => {
    return expect(getUserDetails('')).rejects.toBe('error');
  });
});
