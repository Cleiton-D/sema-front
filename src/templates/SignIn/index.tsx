import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

const SignIn = () => {
  const [values, setValues] = useState({ email: '', password: '' });

  const { push, query } = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
    });

    if (result?.url) {
      return push(result.url);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" onChange={handleInput} />
      <input name="password" type="password" onChange={handleInput} />
      <button type="submit">logar</button>
    </form>
  );
};

export default SignIn;
