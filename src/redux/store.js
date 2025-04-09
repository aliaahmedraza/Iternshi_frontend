import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSclicer.js";
import { configureStore } from "@reduxjs/toolkit";
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  }
});

export const persistor = persistStore(store);
export default store;
