import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { FiCamera } from "react-icons/fi";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { api } from "../../services/api";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { queryClient } from "../../services/queryClient";

type FormInputData = {
  name: string;
  email: string;
  phone_number: string;
  avatar: File[];
}

type ContactFormProps = {
  defaultValues?: {
    id: string;
    avatar_url: string;
    name: string;
    email: string;
    phone_number: string;
  }
}

export function ContactForm({ defaultValues }: ContactFormProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [previewImage, setPreviewImage] = useState<string | undefined>(defaultValues?.avatar_url);

  const mutate = useMutation(async (data: FormData) => {
    if (defaultValues) {
      try {
        await api.put(`/contacts/${defaultValues.id}`, data);
      } catch (err) {

      }
    } else {
      try {
        await api.post('/contacts', data);
      } catch (err) {

      }
    }
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('contacts');
    }
  })

  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    avatar: yup.mixed().test('test', () => {
      if (previewImage) {
        return true;
      }

      return false;
    }),
    phone_number: yup.string()
      .required()
      .test('verifyCharacters', (value) => {
        const trattedValue = value!.replaceAll(/[-_()\s+]/g, '');

        if (trattedValue.length === 11) {
          return true;
        }

        return false;
      })
  }).required();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: defaultValues?.email,
      name: defaultValues?.name,
      phone_number: defaultValues?.phone_number,
    }
  });

  const { avatar } = watch();

  useEffect(() => {
    if (avatar?.length > 0) {
      setSelectedImage(avatar[0]);
      setPreviewImage(URL.createObjectURL(avatar[0]));
    }
  }, [avatar]);

  async function onSubmit({ name, email, phone_number }: FormInputData) {
    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('phone_number', phone_number);

    if (selectedImage) data.append('avatar', selectedImage);

    await mutate.mutateAsync(data);

    router.push('/');
  }

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
      <label className="block">
        {previewImage ? (
          <Image
            src={previewImage}
            width={256}
            height={256}
            alt="orp"
            className="w-64 h-64 rounded-full cursor-pointer"
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center w-64 h-64 gap-4 text-gray-500 duration-100 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-900"
          >
            <FiCamera className="w-20 h-20" />
            {errors.avatar ? (
              <p className="text-sm text-red-500">
                Por favor insira uma imagem.
              </p>
            ) : (
              <p>Insira foto do contato</p>
            )}
          </div>
        )}
        <input className="hidden peer" type="file" {...register('avatar')} />
      </label>

      <label className="flex flex-col w-full gap-1">
        <span className="block font-medium text-slate-700">Name</span>
        <input
          type="text"
          className={`${errors.name ? 'border-red-500' : 'border-gray-800'} border-2 px-4 bg-gray-800 rounded h-14`}
          {...register('name')}
        />
        <p className={`${errors.name ? 'visible' : 'invisible'} mt-1 text-sm text-red-500`}>
          Por favor insira um nome.
        </p>
      </label>
      <label className="flex flex-col w-full gap-1">
        <span className="block font-medium text-slate-700">Email</span>
        <input
          type="email"
          className={`${errors.email ? 'border-red-500' : 'border-gray-800'} border-2 px-4 bg-gray-800 rounded h-14`}
          {...register('email')}
        />
        <p className={`${errors.email ? 'visible' : 'invisible'} mt-1 text-sm text-red-500`}>
          Por favor insira um email válido.
        </p>
      </label>
      <label className="flex flex-col w-full gap-1">
        <span className="block font-medium text-slate-700">Telefone</span>
        <InputMask
          mask="(99) 9 9999-9999"
          defaultValue={defaultValues?.phone_number}
          type="text"
          className={`${errors.phone_number ? 'border-red-500' : 'border-gray-800'} border-2 px-4 bg-gray-800 rounded h-14`}
          {...register('phone_number')}
        />
        <p className={`${errors.phone_number ? 'visible' : 'invisible'} mt-1 text-sm text-red-500`}>
          Por favor insira um número de telefone válido.
        </p>
      </label>

      <button type="submit" className="w-full h-10 mt-2 duration-100 bg-blue-500 rounded hover:bg-blue-600">Enviar</button>
    </form>
  )
}