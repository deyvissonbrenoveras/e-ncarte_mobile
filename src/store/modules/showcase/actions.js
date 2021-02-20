export function loadRequest(url) {
  return {
    type: '@showcase/LOAD_REQUEST',
    payload: { url },
  };
}
export function showcaseFailure() {
  return {
    type: '@showcase/FAILURE',
  };
}
export function loadSuccess(showcase) {
  return {
    type: '@showcase/LOAD_SUCCESS',
    payload: showcase,
  };
}

export function notFound() {
  return {
    type: '@showcase/NOT_FOUND',
  };
}
