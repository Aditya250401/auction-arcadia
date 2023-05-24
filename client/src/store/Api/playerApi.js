import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const URL = 'http://localhost:5000'

export const playerApi = createApi({
	reducerPath: 'playerApi',
	baseQuery: fetchBaseQuery({ baseUrl: URL }),
	endpoints: (builder) => ({
		fetchAllPlayers: builder.query({
			query: () => 'player',
		}),
		updatePlayer: builder.mutation({
			query: (slugId, { player_team, player_currentPrice }) => ({
				url: `players/${slugId}`,
				method: 'PUT',
				body: { player_team, player_currentPrice },
			}),
		}),
	}),
})

export const { useFetchAllPlayersQuery, useUpdatePlayerMutation } = playerApi
