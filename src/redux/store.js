import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import authReducer from "./auth/authReducer";
import teachersReducer from "./teachers/teachersReducer";
import studentsReducer from "./students/studentsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  teachers: teachersReducer,
  students: studentsReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger, thunk));
export default store;
