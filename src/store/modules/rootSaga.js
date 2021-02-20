import { all } from 'redux-saga/effects';

// import auth from './auth/sagas';
import store from './store/sagas';
// import user from './user/sagas';
// import product from './product/sagas';
// import partner from './partner/sagas';
// import category from './category/sagas';
import showcase from './showcase/sagas';

export default function* rootSaga() {
  return yield all([
    /* auth, user, product, partner, category, */
    store,
    showcase,
  ]);
}
