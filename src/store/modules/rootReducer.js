import { combineReducers } from 'redux';

// import auth from './auth/reducer';
// import profile from './profile/reducer';
// import user from './user/reducer';
import store from './store/reducer';
// import product from './product/reducer';
import partner from './partner/reducer';
// import category from './category/reducer';
import showcase from './showcase/reducer';
import cart from './cart/reducer';

export default combineReducers({
  // auth,
  // profile,
  // user,
  store,
  // product,
  partner,
  // category,
  showcase,
  cart,
});
