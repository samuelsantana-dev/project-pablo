import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { InterfacePatientRegistration } from '../../types/index';

export  function RegistrationPatient() {
  const { register, handleSubmit, reset, watch, setValue } = useForm<InterfacePatientRegistration>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      birthdate: '',
      age: '',
      height: '',
      weight: ''
    }
  });

  const formData = watch();

  useEffect(() => {
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      reset(JSON.parse(savedData));
    }
  }, [reset]);

  useEffect(() => {
    localStorage.setItem('userFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (formData.birthdate) {
      const age = calculateAge(formData.birthdate);
      setValue('age', age.toString());
    }
  }, [formData.birthdate, setValue]);

  const calculateAge = (birthdate: string): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const onSubmit = (data: InterfacePatientRegistration) => {
    console.log(data);
    alert('Formulário enviado com sucesso!');
  };

  const handleReset = () => {
    reset({
      name: '',
      email: '',
      phone: '',
      birthdate: '',
      age: '',
      height: '',
      weight: ''
    });
    localStorage.removeItem('userFormData');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Nome:
        <input type="text" {...register('name')} required />
      </label>
      <label>
        E-mail:
        <input type="email" {...register('email')} required />
      </label>
      <label>
        Telefone:
        <input type="tel" {...register('phone')} required />
      </label>
      <label>
        Data de Nascimento:
        <input type="date" {...register('birthdate')} required />
      </label>
      <label>
        Idade:
        <input type="text" {...register('age')} readOnly />
      </label>
      <label>
        Altura (cm):
        <input type="number" {...register('height')} />
      </label>
      <label>
        Peso (kg):
        <input type="number" {...register('weight')} />
      </label>
      <button type="submit">Enviar</button>
      <button type="button" onClick={handleReset}>Redefinir</button>
    </form>
  );
};
