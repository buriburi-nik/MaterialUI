import { useDispatch, useSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Specialized selectors for each slice
export const useUISelector = (selector) =>
  useSelector((state) => selector(state.ui));
export const useScrollSelector = (selector) =>
  useSelector((state) => selector(state.scroll));
export const useMaterialsSelector = (selector) =>
  useSelector((state) => selector(state.materials));
export const useAuthSelector = (selector) =>
  useSelector((state) => selector(state.auth));
