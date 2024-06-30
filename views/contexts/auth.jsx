import { toast } from 'react-toastify';
import { useState, createContext, useContext, useEffect } from 'react';
import api from '../api/api.js';

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({
		'username': '',
		'role': ''
	});

	const login = async(username, password) => {
		try {
			const response = await api.post('/login', {
				username: username,
				password: password,
			});

			setUser(response.data.user);
			api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;

			localStorage.setItem('@App:user', JSON.stringify(response.data.user));
			localStorage.setItem('@App:accessToken', response.data.accessToken);
		} catch(error) {
			toast.error('Usuário ou senha inválidos');
		}

	}

	const logout = () => {
		setUser(null);
		localStorage.removeItem('@App:user');
		localStorage.removeItem('@App:accessToken');
	}

	useEffect(() => {
		const storedUser = localStorage.getItem('@App:user');
		const storedToken = localStorage.getItem('@App:accessToken');
		if (storedToken && storedUser) {
			setUser(JSON.parse(storedUser));
			api.defaults.headers.Authorization = `Bearer ${storedToken}`;
		}
	}, []);

	return (
		<AuthContext.Provider value={{ signed: Boolean(user), user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	return context;
}