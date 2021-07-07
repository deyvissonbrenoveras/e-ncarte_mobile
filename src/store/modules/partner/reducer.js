import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  partner: {},
};
export default function partner(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@partner/LOAD_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@partner/LOAD_SUCCESS':
      return produce(state, (draft) => {
        draft.partner = action.payload;
        draft.loading = false;
      });
    case '@partner/FAILURE':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
