import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => typeof AppDispatch = useDispatch;
export const useAppSelector: typeof TypedUseSelectorHook = useSelector;
