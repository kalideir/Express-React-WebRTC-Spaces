export { default as useClipboard } from './useClipboard';
export { default as useSocket } from './useSocket';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
