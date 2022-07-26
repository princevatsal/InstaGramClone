import { FakeFirestore,mockFirebase} from "firestore-jest-mock";
import {users,posts} from "./data";


const mockFireStore =()=>new FakeFirestore({
  Users:users,
  Posts:posts,
});
jest.mock('@react-native-firebase/firestore', () => {
    return mockFireStore;
  });

jest.mock('@react-native-firebase/storage', () => ({
  firebase: { app: jest.fn() },
}));