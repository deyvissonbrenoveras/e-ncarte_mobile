import { takeLatest, all, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';
import { storeFailure, loadStoresSuccess } from './actions';

export function* loadStoresRequest() {
  try {
    const response = yield call(api.get, 'stores');
    yield put(loadStoresSuccess(response.data));
  } catch (err) {
    yield put(storeFailure());
    Alert.alert(
      'Erro',
      err.response.data
        ? err.response.data.error
        : 'Erro ao se comunicar com o servidor'
    );
  }
}

export function* addStoreRequest({ payload, successCb }) {
  try {
    yield call(api.post, 'stores', payload);
    Alert.alert('Sucesso!', 'A loja foi cadastrada com sucesso');
    successCb();
  } catch (err) {
    yield put(storeFailure());
    Alert.alert(
      'Erro',
      err.response.data ? err.response.data.error : 'Erro ao cadastrar a loja'
    );
  }
}
export function* updateStoreRequest({ payload }) {
  const { id, store } = payload;
  try {
    yield call(api.put, `stores/${id}`, store);
    Alert.alert('Sucesso!', 'A loja foi editada com sucesso');
  } catch (err) {
    yield put(storeFailure());
    Alert.alert(
      'Erro',
      err.response.data ? err.response.data.error : 'Erro ao atualizar a loja'
    );
  }
}
export default all([
  takeLatest('@store/ADD_REQUEST', addStoreRequest),
  takeLatest('@store/LOAD_STORES_REQUEST', loadStoresRequest),
  takeLatest('@store/UPDATE_REQUEST', updateStoreRequest),
]);
