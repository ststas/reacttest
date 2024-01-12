/* eslint-disable no-unused-vars */
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function transformPhone(number) {
	if (number.includes('+')) {
		return number;
	}
	return `+${number}`;
}

function formatDate(date) {
	return new Date(date).toLocaleDateString().replaceAll('/', '.');
}

const schema = yup
	.object({
		picture: yup.lazy((value) => {
			if (value) {
				return value.length !== 0
					? yup
							.mixed()
							.test(
								'fileSize',
								'Размер файла превышает 5 Мб.',
								(file) => file[0].size <= 5242880
							)
					: yup.mixed().notRequired();
			}
			return yup.mixed().notRequired();
		}),
		email: yup
			.string()
			.required('This field is required')
			.matches(/^\S+@\S+\.[a-zA-Z]{2,}$/, 'Please enter correct e-mail'),
		password: yup
			.string()
			.required('This field is required')
			.matches(
				/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
				'Password must contain at least 8 characters, one uppercase, one number and one special case character'
			),
		phone: yup
			.string()
			.required('This field is required')
			// .transform((value) =>
			// 	value !== null && value.includes('+') ? value : `+${value}`
			// )
			.matches(
				/^([+]{1,1})([0-9]{11,14})$/,
				'Укажите телефон в формате "+79991110022". Длина номера от 11 до 14 цифр'
			),
		dateBegin: yup
			.date()
			.required('Введите дату в формате ДД.ММ.ГГГГ')
			.min('Jan 1 1900', 'Дата начала работы не должна быть раньше 01.01.1900')
			.max(Date(), `Дата начала не должна быть позднее ${formatDate(Date())}`),
		dateEnd: yup.date().when('dateBegin', {
			is: (value) => value.toString().includes('GMT'),
			then: () =>
				yup
					.date()
					.required('Введите дату в формате ДД.ММ.ГГГГ')
					.min(
						yup.ref('dateBegin'),
						({ min }) =>
							`Дата окончания не должна быть ранее ${formatDate(min)}`
					),
			otherwise: () =>
				yup
					.date()
					.required('Введите дату в формате ДД.ММ.ГГГГ')
					.max('Jan 1 1000', 'Введите дату начала работы.'),
		}),
	})
	.required();

let renderCount = 0;

export default function NewForm() {
	// eslint-disable-next-line no-plusplus
	renderCount++;

	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: { isValid, errors },
	} = useForm({
		defaultValues: {
			phone: '+79091114422',
			email: 'isaevaPA@company.com',
			password: '1@12Qwqwqwf',
		},
		resolver: yupResolver(schema),
		mode: 'onChange',
	});
	// функция трекинга полей двух объектов на изменения
	// function compareFields(data, newData) {
	// 	return Object.keys(data).reduce(
	// 		(acc, rec) => acc && data[rec] === newData[rec],
	// 		true
	// 	);
	// }

	const onSubmit = (data) => console.log(data);

	console.log(watch().dateBegin);

	return (
		<div>
			<header>
				<h2>{renderCount}</h2>
			</header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					render={({ field }) => (
						<input
							{...field}
							className="input"
							type="text"
							placeholder="Введите телефон"
							onChange={(e) => field.onChange(transformPhone(e.target.value))}
						/>
					)}
					name="phone"
					control={control}
				/>
				<p
					style={{ color: 'red', minHeight: '24px', margin: '0', padding: '0' }}
				>
					{errors.phone?.message}
				</p>
				<input
					{...register('email')}
					className="input"
					type="email"
					placeholder="Введите почту"
				/>
				<p
					style={{ color: 'red', minHeight: '24px', margin: '0', padding: '0' }}
				>
					{errors.email?.message}
				</p>
				<input
					{...register('password')}
					className="input"
					type="text"
					placeholder="Введите пароль"
				/>
				<p
					style={{ color: 'red', minHeight: '24px', margin: '0', padding: '0' }}
				>
					{errors.password?.message}
				</p>
				<input type="file" {...register('picture')} accept=".jpg,,.png,.jpeg" />
				<p
					style={{ color: 'red', minHeight: '24px', margin: '0', padding: '0' }}
				>
					{errors.picture?.message}
				</p>
				<input
					{...register('dateBegin')}
					className="input"
					type="date"
					placeholder="Введите дату"
				/>
				<p
					style={{ color: 'red', minHeight: '24px', margin: '0', padding: '0' }}
				>
					{errors.dateBegin?.message}
				</p>
				<input
					{...register('dateEnd')}
					className="input"
					type="date"
					placeholder="Введите дату"
					disabled={!(watch().dateBegin !== undefined && !errors.dateBegin)}
				/>
				<p
					style={{ color: 'red', minHeight: '24px', margin: '0', padding: '0' }}
				>
					{errors.dateEnd?.message}
				</p>
				<button type="submit" className="button is-primary" disabled={!isValid}>
					Отправить
				</button>
			</form>
		</div>
	);
}
