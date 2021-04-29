import { Session } from 'next-auth';
import { RefObject, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ModalRef } from 'components/Modal';

import { initializeApi, useMutation } from 'services/api';

import * as S from 'components/AddUserModal/styles';
import ToastContent from 'components/ToastContent';

export function useAddUserMutation(
  modalRef: RefObject<ModalRef>,
  session?: Session | null
) {
  const addUser = useCallback(
    async (values) => {
      const api = initializeApi(session);
      return api.post('/users', values);
    },
    [session]
  );

  return useMutation('add-user', addUser, {
    linkedQueries: {
      'get-users': (old, newUser) => [
        ...old,
        { ...newUser, id: uuidv4(), disabled: true }
      ]
    },
    onMutate: () => modalRef.current?.closeModal(),
    renderLoading: function render(newUser) {
      return (
        <ToastContent showSpinner>
          Salvando usuário {newUser.username}...
        </ToastContent>
      );
    },
    renderError: (newUser) => `Falha ao inserir usuário ${newUser.username}`,
    renderSuccess: (newUser) =>
      `Usuário ${newUser.username} inserido com sucesso`
  });
}
