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
	maxDaysInAdvance: z.coerce
		.number('O máximo de dias de antecedência é obrigatória')
		.positive('O máximo de dias de antecedência deve ser maior que 0'),
	minimunProbability: z.coerce
		.number('O probabilidade mínima do evento ocorrer é obrigatória')
		.positive('O probabilidade mínima do evento ocorrer deve ser maior que 0'),
});

function WarningForm() {
	const navigate = useNavigate();

	const params = useParams();
	const warningId = params.id;

	const { register, handleSubmit, formState, setValue, setError } = useForm({
		resolver: zodResolver(validationSchema),
	});
	const { errors: validationErrors } = formState;

	const translateApiErrorsToForm = (response) => {
		//TODO nao vou mais precisar dessa bomba
		let validationErrors = response.data.errors;
		for (let field in validationErrors) {
			let id = field.split('.')[1];
			let errorMessage = '';

			validationErrors[field].forEach((error) => {
				errorMessage += error.split('|')[0];
			});

			setError(id, { type: 'manual', message: errorMessage });
		}
	};

	const handleResponseError = (response) => {
		if (response.status == 400 && response.data.errors) {
			translateApiErrorsToForm(response);
		}
	};

	const onSubmit = async (data) => {
		try {
			const response = isNaN(warningId)
				? await WarningApi.create(data)
				: await WarningApi.update(warningId, data);

			if (response.status == 200) {
				toast.success('Aviso salvo com sucesso!');
				return navigate('/warnings');
			}

			handleResponseError(response);
		} catch (exception) {
			handleResponseError(exception.response);
		}
	};

	useEffect(() => {
		const getWarningData = async (warningId) => {
			const response = await WarningApi.getById(warningId);
			return response.data;
		};

		if (warningId.length) {
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
					<label htmlFor="name" className="block text-gray-700">Título:</label>
					<input type="text" id="name" name="name" className="w-full p-2 border-b border-gray-300 outline-none" {...register('name')} />
					{validationErrors.name && (
						<p className="text-red-500">
							{validationErrors.name.message}
						</p>
					)}
				</div>
				<div>
					<label htmlFor="maxDaysInAdvance" className="block text-gray-700">Máximo de dias de antecedência:</label>
					<input type="number" id="maxDaysInAdvance" name="maxDaysInAdvance" className="w-full p-2 border-b border-gray-300 outline-none" {...register('maxDaysInAdvance')} />
					{validationErrors.maxDaysInAdvance && (
						<p className="text-red-500">
							{validationErrors.maxDaysInAdvance.message}
						</p>
					)}
				</div>
				<div>
					<label htmlFor="minimunProbability" className="block text-gray-700">Probabilidade mínima do evento ocorrer:</label>
					<input type="number" id="minimunProbability" name="minimunProbability" className="w-full p-2 border-b border-gray-300 outline-none" {...register('minimunProbability')} />
					{validationErrors.minimunProbability && (
						<p className="text-red-500">
							{validationErrors.minimunProbability.message}
						</p>
					)}
				</div>
				<div className="flex space-x-4">
					<button type="button" onClick={() => navigate('/warnings')} className="w-1/2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
					<button type="submit" className="w-1/2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Enviar</button>
				</div>
			</form>
		</div>
	);
}

WarningForm.propTypes = {
	readOnly: PropTypes.bool,
};

export default WarningForm;
