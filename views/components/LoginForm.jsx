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
		<form onSubmit={handleSubmit}>
			<div>
				<label>Usuário: </label>
				<input
					type="text"
					name="username"
					value={data.username}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Senha: </label>
				<input
					type="password"
					name="password"
					value={data.password}
					onChange={handleChange}
					required
				/>
			</div>
			<button type="submit">Login</button>
		</form>
	);
}
export default LoginForm;