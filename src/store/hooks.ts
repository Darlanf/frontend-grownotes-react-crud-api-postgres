import {
  AnyAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type {
  RootState,
  AppDispatch,
} from "./index";

export type AppThunkDispatch = ThunkDispatch<
  RootState,
  any,
  AnyAction
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch =
  useDispatch;
export const useThunkAppDispatch = () =>
  useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;
