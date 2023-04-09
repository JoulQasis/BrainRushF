import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import {

  persistStore,

  persistReducer,

  FLUSH,

  REHYDRATE,

  PAUSE,

  PERSIST,

  PURGE,

  REGISTER

} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: "root", storage, version: 1 };

const persistedReducer = persistReducer(persistConfig, store);

const myStore = configureStore({

  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware({

      serializableCheck: {

        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],

      },

    }),

});

if (process.env.NODE_ENV === "production") disableReactDevTools();
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={myStore}>
    <PersistGate loading={null} persistor={persistStore(myStore)}>
      <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);