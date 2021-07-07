import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';

import { partnerFailure, loadSuccess } from './actions';

function* loadPartnerRequest({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `partners/${id}`);
    yield put(loadSuccess(response.data));
  } catch (err) {
    yield put(partnerFailure());
    Alert.alert(
      'Erro',
      err.response.data
        ? err.response.data.error
        : 'Erro ao carregar o parceiro'
    );
  }
}
export default all([takeLatest('@partner/LOAD_REQUEST', loadPartnerRequest)]);
