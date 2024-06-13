import { all, fork } from "redux-saga/effects";

import userSaga from "../sagas/users";
import authSaga from "../sagas/auth";

function* rootSaga() {
  yield all([fork(userSaga), fork(authSaga)]);
}

export default rootSaga;
