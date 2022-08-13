import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../redux/reducer";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import rootSaga from "../redux/saga";

// const persistConfig = {
//   key: "root",
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export let persistor: any;
function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const appliedMiddlewares = applyMiddleware(sagaMiddleware);

    const middleware = composeWithDevTools(appliedMiddlewares);
    const store = createStore(rootReducer, middleware);
    //   const store = createStore(persistedReducer, middleware);
    //   persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);

    return store;
}

export default configureStore;
