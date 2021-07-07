export function loadPartnerRequest(id) {
  return {
    type: '@partner/LOAD_REQUEST',
    payload: { id },
  };
}
export function loadSuccess(payload) {
  return {
    type: '@partner/LOAD_SUCCESS',
    payload,
  };
}
export function partnerFailure() {
  return {
    type: '@partner/FAILURE',
  };
}
