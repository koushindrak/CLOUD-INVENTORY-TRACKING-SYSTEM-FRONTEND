import { all } from "redux-saga/effects";
import Axios from "axios";
import { fetchMessageWatcher } from "../components/ChatForm/chatSagas";
import productSaga  from '../pages/Products/saga';

export let callAPI = async ({ url, method, data }) => {
  return await Axios({url, method, data});
};

export default function* rootSaga() {
  yield all([
      fetchMessageWatcher(),
      productSaga()
  ]);
}
