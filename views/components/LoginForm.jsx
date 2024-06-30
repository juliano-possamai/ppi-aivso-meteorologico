import { useState } from 'react';
import { useAuth } from '../contexts/auth';

function LoginForm() {
	const auth = useAuth();

	const [data, setData] = useState({
		username: '',
		password: ''
	})

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		auth.login(data.username, data.password);
	};

	return (
		<form onSubmit={handleSubmit} className="flex space-x-4 items-end">
			<div className="flex flex-col items-center">
				<label className="mb-2 text-white">Usuário:</label>
				<input
					type="text"
					name="username"
					value={data.username}
					onChange={handleChange}
					required
					className="border rounded px-2 py-1"
				/>
			</div>
			<div className="flex flex-col items-center">
				<label className="mb-2 text-white">Senha:</label>
				<input
					type="password"
					name="password"
					value={data.password}
					onChange={handleChange}
					required
					className="border rounded px-2 py-1"
				/>
			</div>
			<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
		</form>
	);
}
export default LoginForm;