import { useDispatch, useSelector } from "react-redux";

// Custom hooks to avoid repeating types/boilerplate
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
