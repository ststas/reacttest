/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
	.object({
		email: yup
			.string()
			.required()
			.matches(/^\S+@\S+\.[a-zA-Z]{2,}$/, 'Please enter correct e-mail'),
		password: yup
			.string()
			.required()
			.matches(
				/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
				'Password must contain at least 8 characters, one uppercase, one number and one special case character'
			),
	})
	.required();

export default function NewForm() {
	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});
	const onSubmit = (data) => console.log(data);

	console.log(errors.email);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
