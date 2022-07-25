jest.mock('@react-native-firebase/firestore', () => {
    return {
      initializeApp:jest.fn(),
      _default:jest.fn(),
      firestore: jest.fn().mockReturnValue({
        _default:jest.fn(),
        collection: jest.fn().mockReturnValue({
          add: jest.fn().mockResolvedValue({
            id: 'abc123'
          })
        })
      })
    };
  });
  jest.mock('@react-native-firebase/storage', () => ({
		firebase: { app: jest.fn() },
	}));