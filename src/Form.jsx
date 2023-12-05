/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";

export default function Form() {
    const {
    register,
    handleSubmit,
    // Read the formState before render to subscribe the form state through the Proxy
    formState: { isDirty, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName", { required: true, minLength: 5, maxLength: 20 })} />
        <input {...register("lastName", { required: true, minLength: 2, maxLength: 20 })} />
        <input type="submit" disabled={!isValid}/>
      </form>
  )
}
