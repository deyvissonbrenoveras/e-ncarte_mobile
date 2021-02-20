import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'e-ncarte',
      storage: AsyncStorage,
      whitelist: [/* 'auth', 'profile', */ 'cart'],
    },
    reducers
  );
  return persistedReducer;
};
