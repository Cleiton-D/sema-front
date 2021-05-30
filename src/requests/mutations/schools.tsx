import { Session } from 'next-auth';
import { useCallback } from 'react';

import { initializeApi, useMutation } from 'services/api';

import ToastContent from 'components/ToastContent';

export function useAddSchoolMutation(session?: Session | null) {
  const addSchool = useCallback(
    async (values) => {
      const api = initializeApi(session);
      return api.post('/schools', values);
    },
    [session]
  );

  return useMutation('add-school', addSchool, {
    renderLoading: function render(newSchool) {
      return (
        <ToastContent showSpinner>
          Salvando escola {newSchool.name}...
        </ToastContent>
      );
    },
    renderError: (newSchool) => `Falha ao inserir escola ${newSchool.name}`,
    renderSuccess: (newSchool) => `${newSchool.name} inserida com sucesso`
  });
}
