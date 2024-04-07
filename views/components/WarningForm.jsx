import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import WarningApi from '../api/WeatherApi';
import { useNavigate, useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const validationSchema = z.object({
	name: z.string().trim().min(1, 'O nome é obrigatório'),
	email: z.string().min(1, 'O email é obrigatório').email('Informe um email válido'),
	maxDaysUntilEvent: z.coerce
		.number('O máximo de dias até o evento é obrigatório')
		.min(1, 'O máximo de dias até o evento deve ser maior que 1')
		.max(14, 'O número máximo de dias até o evento é 14'),
	minimunProbability: z.coerce
		.number('O probabilidade mínima do evento ocorrer é obrigatória')
		.positive('O probabilidade mínima do evento ocorrer deve ser maior que 0'),
});

function WarningForm() {
	const navigate = useNavigate();

	const params = useParams();
	const warningId = params.id ?? '';

	const { register, handleSubmit, formState, setValue, setError } = useForm({
		resolver: zodResolver(validationSchema),
	});
	const { errors: validationErrors } = formState;

	const handleResponseError = (response) => {
		if (response.status == 400 && response.data.errors) {
			response.data.errors.forEach((error) => {
				setError(error.field, { message: error.message })
			})
		}
	};

	const onSubmit = async (data) => {
		try {
			const response = !warningId.length
				? await WarningApi.create(data)
				: await WarningApi.update(warningId, data);

			if (response.status == 201 || response.status == 204) {
				toast.success('Aviso salvo com sucesso!');
				return navigate('/warnings');
			}
		} catch (exception) {
			handleResponseError(exception.response);
		}
	};

	useEffect(() => {
		const getWarningData = async (warningId) => {
			const response = await WarningApi.getById(warningId);
			return response.data;
		};

		if (warningId) {
			getWarningData(warningId).then((data) => {
				for (const field in data) {
					setValue(field, data[field]);
				}
			});
		}
	}, [warningId, setValue]);

	return (
		<div className="mx-auto p-4">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label htmlFor="name" className="block text-gray-700">Nome:</label>
					<input type="text" id="name" name="name" placeholder="Informe o nome do aviso" className="w-full p-2 border-b border-gray-300 outline-none" {...register('name')} />
					{validationErrors.name && (
						<p className="text-red-500">
							{validationErrors.name.message}
						</p>
					)}
				</div>
				<div>
					<label htmlFor="email" className="block text-gray-700">Email:</label>
					<input type="text" id="email" name="email" placeholder="Informe o email que receberá a notificação" className="w-full p-2 border-b border-gray-300 outline-none" {...register('email')} />
					{validationErrors.name && (
						<p className="text-red-500">
							{validationErrors.email.message}
						</p>
					)}
				</div>
				<div className="flex">
					<div className="w-1/2">
						<label htmlFor="maxDaysUntilEvent" className="block text-gray-700">Máximo de dias de antecedência:</label>
						<input type="number" id="maxDaysUntilEvent" name="maxDaysUntilEvent" placeholder="Informe o máximo de dias de antecedência" className="w-full p-2 border-b border-gray-300 outline-none" {...register('maxDaysUntilEvent')} />
						{validationErrors.maxDaysUntilEvent && (
							<p className="text-red-500">
								{validationErrors.maxDaysUntilEvent.message}
							</p>
						)}
					</div>
					<div className="w-1/2">
						<label htmlFor="minimunProbability" className="block text-gray-700">Probabilidade mínima do evento ocorrer:</label>
						<input type="number" id="minimunProbability" name="minimunProbability" placeholder="Informe a probabilidade mínima do evento ocorrer" className="w-full p-2 border-b border-gray-300 outline-none" {...register('minimunProbability')} />
						{validationErrors.minimunProbability && (
							<p className="text-red-500">
								{validationErrors.minimunProbability.message}
							</p>
						)}
					</div>
				</div>
				<div className="flex space-x-4">
					<button type="button" onClick={() => navigate('/warnings')} className="w-1/2 text-green-600 py-2 px-4 rounded-md border border-green-600 hover:bg-green-100 transition hover:shadow-md">Cancelar</button>
					<button type="submit" className="w-1/2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition hover:shadow-md">Enviar</button>
				</div>
			</form>
		</div>
	);
}

WarningForm.propTypes = {
	readOnly: PropTypes.bool,
};

export default WarningForm;
