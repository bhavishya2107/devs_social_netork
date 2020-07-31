import { createStore, combineReducers, applyMiddleware } from "redux";
import developerReducer from "./Reducers/developerReducer";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
  developer: developerReducer,
});

export let store = createStore(rootReducer, applyMiddleware(thunk));
