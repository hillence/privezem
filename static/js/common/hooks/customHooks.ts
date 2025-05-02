import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppRootState, AppThunkDispatch } from '../../app/store/types'

export const useAppDispatch: () => AppThunkDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
