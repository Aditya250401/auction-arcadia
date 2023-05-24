import { configureStore } from '@reduxjs/toolkit'
import { playerApi } from './Api/playerApi'

export const store = configureStore({
	reducer: {
		[playerApi.reducerPath]: playerApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(playerApi.middleware),
})
