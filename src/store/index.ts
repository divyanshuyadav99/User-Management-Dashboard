import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import userReducer from "./slices/users";
import authReducer from "./slices/auth";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store with the middleware
const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
