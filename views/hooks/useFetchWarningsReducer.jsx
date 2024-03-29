import { useEffect, useReducer } from 'react';
import WarningApi from '../api/WeatherApi';

const initialState = {
	loading: true,
	data: [],
	error: null,
};

const reduce = (state, action) => {
	switch (action.type) {
		case 'OnFetching':
			return {
				loading: true,
				data: [],
				error: null,
			};
		case 'OnSuccess':
			return {
				loading: false,
				data: action.payload.docs,
				error: null,
			};
		case 'OnFailure':
			return {
				loading: false,
				data: [],
				error: 'Lamento, ocorreu um erro!',
			};
		default:
			return state;
	}
};

export function useFetchWarningsReducer() {
	const [state, dispatch] = useReducer(reduce, initialState);
	useEffect(() => {
		const listWarnings = async() => {
			try {
				const result = await WarningApi.getAll();

				if (result.data) {
					return dispatch({ type: 'OnSuccess', payload: result.data });
				}

				dispatch({ type: 'OnFailure' });
			} catch (err) {
				dispatch({ type: 'OnFailure' });
			}
		}

		dispatch({ type: 'OnFetching' });
		listWarnings();
	}, [dispatch]);

	return { state };
}
