import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} from "../slices/users";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";

// Define types for action payloads
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const API_URL = "https://reqres.in/api/users";

function* fetchUsers(): SagaIterator {
  try {
    const response: AxiosResponse<{ data: User[] }> = yield call(
      axios.get,
      API_URL
    );
    yield put(fetchUsersSuccess(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      yield put(fetchUsersFailure(error.message));
    } else {
      yield put(fetchUsersFailure("An unknown error occurred"));
    }
  }
}

function* createUser(action: PayloadAction<Partial<User>>): SagaIterator {
  try {
    const response: AxiosResponse<User> = yield call(
      axios.post,
      API_URL,
      action.payload
    );
    yield put(createUserSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      yield put(createUserFailure(error.message));
    } else {
      yield put(createUserFailure("An unknown error occurred"));
    }
  }
}

function* updateUser(action: PayloadAction<User>): SagaIterator {
  try {
    const response: AxiosResponse<User> = yield call(
      axios.put,
      `${API_URL}/${action.payload.id}`,
      action.payload
    );
    yield put(updateUserSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      yield put(updateUserFailure(error.message));
    } else {
      yield put(updateUserFailure("An unknown error occurred"));
    }
  }
}

export default function* userSaga(): SagaIterator {
  yield takeLatest(fetchUsersRequest.type, fetchUsers);
  yield takeLatest(createUserRequest.type, createUser);
  yield takeLatest(updateUserRequest.type, updateUser);
}
