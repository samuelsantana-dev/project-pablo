import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { InterfacePatientRegistration } from '../../types/index';

export function RegistrationPatient() {
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
    handleReset();
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-base-100 shadow-xl rounded-lg">
        <div className="form-control">
          <label className="label">Nome:</label>
          <input type="text" {...register('name')} required className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">E-mail:</label>
          <input type="email" {...register('email')} required className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Telefone:</label>
          <input type="tel" {...register('phone')} required className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Data de Nascimento:</label>
          <input type="date" {...register('birthdate')} required className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Idade:</label>
          <input type="text" {...register('age')} readOnly className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Altura (cm):</label>
          <input type="number" {...register('height')} className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Peso (kg):</label>
          <input type="number" {...register('weight')} className="input input-bordered" />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="btn btn-primary">Enviar</button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">Redefinir</button>
        </div>
      </form>
    </div>
  );
};
