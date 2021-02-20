import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';

import { loadSuccess, showcaseFailure, notFound } from './actions';

function* loadShowcaseRequest({ payload }) {
  const { url } = payload;
  try {
    const response = yield call(api.get, `store`, { params: { url } });
    yield put(loadSuccess(response.data));
  } catch (err) {
    if (err.response.status === 404) {
      yield put(notFound());
    } else {
      yield put(showcaseFailure());
      Alert.alert(
        'Erro',
        err.response.data
          ? err.response.data.error
          : 'Erro ao carregar as informações da loja'
      );
    }
  }
}

export default all([takeLatest('@showcase/LOAD_REQUEST', loadShowcaseRequest)]);
