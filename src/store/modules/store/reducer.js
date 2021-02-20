import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  stores: [],
};
export default function store(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@store/LOAD_STORES_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@store/LOAD_STORES_SUCCESS':
      return produce(state, (draft) => {
        draft.stores = action.payload;
        draft.loading = false;
      });
    case '@store/ADD_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@store/FAILURE':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
