import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  notFound: false,
  showcase: {},
};
export default function showcase(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@showcase/LOAD_REQUEST':
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case '@showcase/LOAD_SUCCESS':
      return produce(state, (draft) => {
        draft.showcase = action.payload;
        draft.loading = false;
        draft.notFound = false;
      });
    case '@showcase/FAILURE':
      return produce(state, (draft) => {
        draft.loading = false;
      });
    case '@showcase/NOT_FOUND':
      return produce(state, (draft) => {
        draft.notFound = true;
        draft.loading = false;
      });
    default:
      return state;
  }
}
