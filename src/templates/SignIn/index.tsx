import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import { ValidationError } from 'yup';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import TextInput from 'components/TextInput';
import Heading from 'components/Heading';
import Button from 'components/Button';

import { signInSchema } from './rules/schema';

import * as S from './styles';

export type SigninFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const { push, query } = useRouter();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (values: SigninFormData) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      await signInSchema.validate(values, {
        abortEarly: false
      });

      const result = await signIn('credentials', {
        ...values,
        redirect: false,
        callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
      });

      if (result.error) {
        toast.error('Usuário ou senha inválidos!', {
          position: toast.POSITION.TOP_RIGHT
        });
      }

      if (result?.url) {
        return push(result.url);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationError: Record<string, string> = {};

        err.inner.forEach((error) => {
          if (error.path) {
            validationError[error.path] = error.message;
          }
        });

        formRef.current?.setErrors(validationError);
      }
    }

    setLoading(false);
  };

  return (
    <S.Wrapper>
      <S.Content>
        <Heading>Faça seu login</Heading>
        <S.Form onSubmit={handleSubmit} ref={formRef}>
          <TextInput name="email" label="Digite seu email" />
          <TextInput name="password" label="Digite sua senha" type="password" />
          <Button styleType="rounded" size="large" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </S.Form>
      </S.Content>
    </S.Wrapper>
  );
};

export default SignIn;
