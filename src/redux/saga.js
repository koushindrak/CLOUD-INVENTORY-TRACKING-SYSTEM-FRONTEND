import { all } from "redux-saga/effects";
import Axios from "axios";
import { fetchMessageWatcher } from "../components/ChatForm/chatSagas";
// import { fetchProductWatcher } from '../pages/Products/sagas';
import { watchGetProductRequest } from '../pages/Products/saga';

import productsSaga from '../../src/pages/Products/saga';  // replace with actual path to your products sagas file

export let callAPI = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data,
  });
};

export default function* rootSaga() {
  yield all([
      fetchMessageWatcher(),
      // fetchProductWatcher(),
      watchGetProductRequest(),
  ]);
}
