import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import config from "./config/config";
import "react-placeholder/lib/reactPlaceholder.css";
import "./index.css";
import App from "./App";
import MianScreenLoader from "./components/MainScreenLoader/MianScreenLoader";
import * as serviceWorker from "./serviceWorker";
import { RootReducer } from "./store/Reducers/RootReducer";
const rprops = {
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  userProfile: "users",
};
const store = createStore(
  RootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(config, rprops),
    reduxFirestore(config)
  )
);

ReactDOM.render(<MianScreenLoader />, document.getElementById("root"));
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  serviceWorker.unregister();
});
