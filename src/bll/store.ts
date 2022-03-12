import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {appSlice} from "./app-slice";

export const store = configureStore({
   reducer: {
      app: appSlice.reducer,
   }
})

export const useAppSelector: TypedUseSelectorHook<AppRootStateT> = useSelector
export type AppRootStateT = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
