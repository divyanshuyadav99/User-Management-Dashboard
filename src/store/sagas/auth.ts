import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
} from "../slices/auth";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";

// Define types for action payloads
interface AuthPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

const API_URL = "https://reqres.in/api";

function* signInSaga(action: PayloadAction<AuthPayload>): SagaIterator {
  try {
    const response: AxiosResponse<AuthResponse> = yield call(
      axios.post,
      `${API_URL}/login`,
      action.payload
    );
    localStorage.setItem("token", response?.data?.token);
    yield put(signInSuccess(response.data));
  } catch (error) {
    // Handle errors that might not have a response or data property
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage: string =
        error.response.data.error || "An error occurred";
      yield put(signInFailure(errorMessage));
    } else {
      yield put(signInFailure("An unknown error occurred"));
    }
  }
}

function* signUpSaga(action: PayloadAction<AuthPayload>): SagaIterator {
  try {
    const response: AxiosResponse<AuthResponse> = yield call(
      axios.post,
      `${API_URL}/register`,
      action.payload
    );
    yield put(signUpSuccess(response.data));
  } catch (error) {
    // Handle errors that might not have a response or data property
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage: string =
        error.response.data.error || "An error occurred";
      yield put(signUpFailure(errorMessage));
    } else {
      yield put(signUpFailure("An unknown error occurred"));
    }
  }
}

function* authSaga(): SagaIterator {
  yield takeLatest(signInRequest.type, signInSaga);
  yield takeLatest(signUpRequest.type, signUpSaga);
}

export default authSaga;
