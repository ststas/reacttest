/* eslint-disable no-unused-vars */
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
	.object({
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
			.matches(
				/^(?=.{12,15}$)[+]+[0-9]*$/,
				'Используйте формат записи номера "+79991110022".'
			),
	})
	.required();

export default function NewForm() {
	const {
		control,
		register,
		handleSubmit,
		formState: { isValid, errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = (data) => console.log(data);

	function transformPhone(number) {
		if (number.includes('+')) {
			return number;
		}
		return `+${number}`;
	}

	console.log(isValid);

	return (
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
				defaultValue=""
			/>
			<p style={{ color: 'red', minHeight: '24px', margin: '0', padding: '0' }}>
				{errors.phone?.message}
			</p>
			<input
				{...register('email')}
				className="input"
				type="email"
				placeholder="Введите почту"
			/>
			<p style={{ color: 'red', minHeight: '24px', margin: '0', padding: '0' }}>
				{errors.email?.message}
			</p>
			<input
				{...register('password')}
				className="input"
				type="text"
				placeholder="Введите пароль"
			/>
			<p style={{ color: 'red', minHeight: '24px', margin: '0', padding: '0' }}>
				{errors.password?.message}
			</p>
			<input type="submit" className="button is-primary" disabled={!isValid} />
		</form>
	);
}
