/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

let renderCount = 0;

function formatDate(date) {
	return new Date(date).toLocaleDateString().replaceAll('/', '.');
}

const priorWorkExperienceSchema = yup.object().shape({
	priorWorkExperienceFieldSet: yup.array().of(
		yup.object({
			companyName: yup
				.string()
				.required('Заполните поле')
				.min(2, 'Минимальное кол-во символов 2')
				.max(60, 'Максимальное кол-во символов 60'),
			position: yup
				.string()
				.required('Заполните поле')
				.min(2, 'Минимальное кол-во символов 2')
				.max(70, 'Максимальное кол-во символов 70'),
			beginDate: yup
				.date('Введите дату в формате ДД.ММ.ГГГГ')
				.typeError('Введите дату в формате ДД.ММ.ГГГГ')
				.required('Введите дату в формате ДД.ММ.ГГГГ')
				.min(
					'Jan 1 1900',
					'Дата начала работы не должна быть раньше 01.01.1900'
				)
				.max(
					Date(),
					`Дата начала не должна быть позднее ${formatDate(Date())}`
				),

			endDate: yup
				.date()
				.typeError('Введите дату в формате ДД.ММ.ГГГГ')
				.when('beginDate', {
					is: (value) => value.toString().includes('GMT'),
					then: () =>
						yup
							.date()
							.typeError('Введите дату в формате ДД.ММ.ГГГГ')
							.required('Введите дату в формате ДД.ММ.ГГГГ')
							.min(
								yup.ref('beginDate'),
								({ min }) =>
									`Дата окончания не должна быть ранее ${formatDate(min)}`
							),
				}),
			jobDescription: yup
				.string()
				.notRequired()
				.min(10, 'Минимальное кол-во символов 10')
				.max(200, 'Максимальное кол-во символов 200'),
		})
	),
	awardsFieldSet: yup.array().of(
		yup.object({
			awardTitle: yup
				.string()
				.required('Заполните поле')
				.min(2, 'Минимальное кол-во символов 2')
				.max(70, 'Максимальное кол-во символов 70'),
			awardDate: yup
				.date('Введите дату в формате ДД.ММ.ГГГГ')
				.required('Введите дату в формате ДД.ММ.ГГГГ')
				.min(
					'Jan 1 1900',
					'Дата начала работы не должна быть раньше 01.01.1900'
				)
				.max(
					Date(),
					`Дата начала не должна быть позднее ${formatDate(Date())}`
				),
			// .typeError('Введите дату в формате ДД.ММ.ГГГГ'),
		})
	),
});

function ConditionalInput({
	className,
	placeholder,
	control,
	type,
	register,
	index,
	errors,
	fieldSetName,
	fieldName,
	conditionalFieldName,
	conditionalFieldType,
}) {
	const value = useWatch({
		control,
		conditionalFieldName: fieldSetName,
	});

	return (
		<div>
			<input
				className={className}
				placeholder={placeholder}
				type={type}
				{...register(`${fieldSetName}.${index}.${fieldName}`, {
					valueAsDate: true,
				})}
				disabled={
					conditionalFieldType === 'date'
						? !(
								value?.[fieldSetName]?.[index]?.[
									conditionalFieldName
								]?.toString() !== 'Invalid Date' &&
								!errors?.[fieldSetName]?.[index]?.[conditionalFieldName]
						  )
						: !(
								value?.[fieldSetName]?.[index]?.[conditionalFieldName] !== '' &&
								!errors?.[fieldSetName]?.[index]?.[conditionalFieldName]
						  )
				}
			/>
		</div>
	);
}

function PriorWorkFieldSet({ errors, register, control }) {
	const { fields, append, remove } = useFieldArray({
		name: 'priorWorkExperienceFieldSet',
		control,
		rules: { required: 'Введите хотя бы одно значение' },
	});
	return (
		<section>
			{fields.map((field, index) => (
				<fieldset
					key={field.id}
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '500px',
						margin: '0 auto',
					}}
				>
					<label
						htmlFor={`priorWorkExperienceFieldSet.${index}.companyName`}
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: '20px',
						}}
					>
						<span>Название компании</span>
						<input
							type="text"
							{...register(`priorWorkExperienceFieldSet.${index}.companyName`)}
						/>
						<span>
							{
								errors?.priorWorkExperienceFieldSet?.[index]?.companyName
									?.message
							}
						</span>
					</label>
					<label
						htmlFor={`priorWorkExperienceFieldSet.${index}.position`}
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: '20px',
						}}
					>
						<span>Должность</span>
						<input
							type="text"
							{...register(`priorWorkExperienceFieldSet.${index}.position`)}
						/>
						<span>
							{errors?.priorWorkExperienceFieldSet?.[index]?.position?.message}
						</span>
					</label>
					<label
						htmlFor={`priorWorkExperienceFieldSet.${index}.beginDate`}
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: '20px',
						}}
					>
						<span>Начало работы</span>
						<input
							type="date"
							{...register(`priorWorkExperienceFieldSet.${index}.beginDate`, {
								valueAsDate: true,
							})}
						/>
						<span>
							{errors?.priorWorkExperienceFieldSet?.[index]?.beginDate?.message}
						</span>
					</label>
					<label
						htmlFor={`priorWorkExperienceFieldSet.${index}.endDate`}
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: '20px',
						}}
					>
						<span>Окончание работы</span>
						<ConditionalInput
							className=""
							control={control}
							type="date"
							register={register}
							index={index}
							errors={errors}
							fieldSetName="priorWorkExperienceFieldSet"
							fieldName="endDate"
							conditionalFieldName="beginDate"
							conditionalFieldType="date"
						/>
						<span>
							{errors?.priorWorkExperienceFieldSet?.[index]?.endDate?.message}
						</span>
					</label>
					<label
						htmlFor={`priorWorkExperienceFieldSet.${index}.jobDescription`}
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: '20px',
						}}
					>
						<span>Функционал</span>
						<textarea
							{...register(
								`priorWorkExperienceFieldSet.${index}.jobDescription`
							)}
						/>
						<span>
							{
								errors?.priorWorkExperienceFieldSet?.[index]?.jobDescription
									?.message
							}
						</span>
					</label>
					<button type="button" onClick={() => remove(index)}>
						Remove
					</button>
				</fieldset>
			))}
			<button
				type="button"
				onClick={() => {
					append({
						companyName: 'Магнит',
						position: 'Сторож',
						beginDate: '2019-05-06',
						endDate: '2020-11-30',
						jobDescription: 'Счастье, радость он будет приносить людям',
					});
				}}
			>
				Append
			</button>
		</section>
	);
}

function AwardsFieldSet({ errors, register, control }) {
	const { fields, append, remove } = useFieldArray({
		name: 'awardsFieldSet',
		control,
		rules: { required: 'Введите хотя бы одно значение' },
	});
	return (
		<section>
			{fields.map((field, index) => (
				<fieldset
					key={field.id}
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '500px',
						margin: '0 auto',
					}}
				>
					<label
						htmlFor={`awardsFieldSet.${index}.awardTitle`}
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: '20px',
						}}
					>
						<span>Название</span>
						<input
							type="text"
							{...register(`awardsFieldSet.${index}.awardTitle`)}
						/>
						<span>{errors?.awardsFieldSet?.[index]?.awardTitle?.message}</span>
					</label>
					<label
						htmlFor={`awardsFieldSet.${index}.awardDate`}
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: '20px',
						}}
					>
						<span>Дата получения</span>
						<ConditionalInput
							className=""
							control={control}
							type="date"
							register={register}
							index={index}
							errors={errors}
							fieldSetName="awardsFieldSet"
							fieldName="awardDate"
							conditionalFieldName="awardTitle"
							conditionalFieldType="string"
						/>
						<span>{errors?.awardsFieldSet?.[index]?.awardDate?.message}</span>
					</label>
					<button type="button" onClick={() => remove(index)}>
						Remove
					</button>
				</fieldset>
			))}
			<button
				type="button"
				onClick={() => {
					append({
						companyName: 'Магнит',
						position: 'Сторож',
						beginDate: '2019-05-06',
						endDate: '2020-11-30',
						jobDescription: 'Счастье, радость он будет приносить людям',
					});
				}}
			>
				Append
			</button>
		</section>
	);
}

export default function NewNewForm() {
	renderCount += 1;

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			priorWorkExperienceFieldSet: [
				{
					companyName: 'Рeкрутинг Рус',
					position: 'Менеджер',
					beginDate: '2021-01-01',
					endDate: '2022-02-10',
					jobDescription: 'Счастье, радость он приносит людям',
				},
			],
			awardsFieldSet: [
				{
					awardTitle: 'Награда',
					awardDate: '2021-01-01',
				},
			],
		},
		resolver: yupResolver(priorWorkExperienceSchema),
		mode: 'onChange',
	});

	return (
		<div>
			<header>
				<h2>{`Рендеры ${renderCount}`}</h2>
			</header>
			<form onSubmit={handleSubmit((data) => console.log('Data', data))}>
				<PriorWorkFieldSet
					errors={errors}
					register={register}
					control={control}
				/>
				<AwardsFieldSet errors={errors} register={register} control={control} />

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

/* {fields.map((field, index) => (
					<fieldset
						key={field.id}
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '500px',
							margin: '0 auto',
						}}
					>
						<label
							htmlFor={`priorWorkExperienceFieldSet.${index}.companyName`}
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginTop: '20px',
							}}
						>
							<span>Название компании</span>
							<input
								type="text"
								{...register(`priorWorkExperienceFieldSet.${index}.companyName`)}
							/>
							<span>
								{errors?.priorWorkExperienceFieldSet?.[index]?.companyName?.message}
							</span>
						</label>
						<label
							htmlFor={`priorWorkExperienceFieldSet.${index}.position`}
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginTop: '20px',
							}}
						>
							<span>Должность</span>
							<input
								type="text"
								{...register(`priorWorkExperienceFieldSet.${index}.position`)}
							/>
							<span>
								{errors?.priorWorkExperienceFieldSet?.[index]?.position?.message}
							</span>
						</label>
						<label
							htmlFor={`priorWorkExperienceFieldSet.${index}.beginDate`}
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginTop: '20px',
							}}
						>
							<span>Начало работы</span>
							<input
								type="date"
								{...register(`priorWorkExperienceFieldSet.${index}.beginDate`, {
									valueAsDate: true,
								})}
							/>
							<span>
								{errors?.priorWorkExperienceFieldSet?.[index]?.beginDate?.message}
							</span>
						</label>
						<label
							htmlFor={`priorWorkExperienceFieldSet.${index}.endDate`}
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginTop: '20px',
							}}
						>
							<span>Окончание работы</span>
							<ConditionalInput
								className=""
								control={control}
								type="date"
								register={register}
								index={index}
								errors={errors}
								fieldSetName="priorWorkExperienceFieldSet"
								conditionalFieldName="beginDate"
							/>
							<span>
								{errors?.priorWorkExperienceFieldSet?.[index]?.endDate?.message}
							</span>
						</label>
						<label
							htmlFor={`priorWorkExperienceFieldSet.${index}.jobDescription`}
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginTop: '20px',
							}}
						>
							<span>Функционал</span>
							<textarea
								{...register(`priorWorkExperienceFieldSet.${index}.jobDescription`)}
							/>
							<span>
								{
									errors?.priorWorkExperienceFieldSet?.[index]?.jobDescription
										?.message
								}
							</span>
						</label>
						<button type="button" onClick={() => remove(index)}>
							Remove
						</button>
					</fieldset>
				))} */
