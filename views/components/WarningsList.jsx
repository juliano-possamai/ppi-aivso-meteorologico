import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import WarningApi from '../api/WeatherApi';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth';

function WarningList() {
	const auth = useAuth();

	const [data, setData] = useState([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const listWarnings = async () => {
			try {
				const response = await WarningApi.getAll();

				if (response.status == 200) {
					setData(response.data);
					return;
				}

				setError('Lamento, ocorreu um erro!')
			} catch (err) {
				setError('Lamento, ocorreu um erro!')
			} finally {
				setLoading(false)
			}
		}

		listWarnings();
	}, []);

	const onDeleteWarning = (warningId) => {
		Swal.fire({
			title: 'Deseja Continuar?',
			text: 'Essa ação não poderá ser desfeita!',
			showCancelButton: true,
			confirmButtonText: 'Sim',
			cancelButtonText: 'Não',
			reverseButtons: true,
			customClass: {
				cancelButton: 'focus:!shadow-none',
				confirmButton: '!bg-red-600 focus:!shadow-none'
			}
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await WarningApi.delete(warningId);
				if (response.status == 204) {
					setData(data.filter(warning => warning.id !== warningId));
					return toast.success('Aviso removido com sucesso!');
				}
			}
		});
	};

	return (
		<div>
			<div className="flex justify-end">
				<Link to="/warnings/create">
					<button className="bg-green-500 hover:bg-green-600 text-white p-2 px-4 rounded transition hover:shadow-md">
						Adicionar Aviso
					</button>
				</Link>
			</div>
			{loading ? (
				<div className="flex flex-col items-center justify-center mt-20">
					<div
						className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
						role="status"
					></div>
					<p className="mt-5">Carregando...</p>
				</div>
			) : error ? (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mt-5">
					Ocorreu um erro ao carregar a lista de avisos.
				</div>
			) : !data.length ? (
				<div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded-md mt-5">
					Nenhum aviso cadastrado.
				</div>
			) : (
				<table className="min-w-full mt-10">
					<thead>
						<tr>
							<th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
								Nome
							</th>
							<th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
								Ações
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((warning) => (
							<tr key={warning.id}>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
									{warning.name}
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
									<Link to={`/warnings/update/${warning.id}`}>
										<button className="text-xs text-green-700 font-semibold p-1 px-2 border border-gray-200 hover:border-green-400 rounded transition">
											Editar
										</button>
									</Link>
									{auth.user.role == 'admin' &&
										<button onClick={() => onDeleteWarning(warning.id)} className="text-xs ml-1 text-red-700 font-semibold-1 p-1 px-2 border border-gray-200 hover:border-red-400 rounded transition">
											<FontAwesomeIcon icon={faTrash} />
										</button>
									}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default WarningList;
