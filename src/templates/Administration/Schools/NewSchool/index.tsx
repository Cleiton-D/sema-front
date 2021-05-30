import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useResetAtom } from 'jotai/utils';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import SchoolBasicForm from 'components/SchoolBasicForm';
import AddressForm from 'components/AddressForm';
import ContactsForm from 'components/ContactsForm';
import FormStep from 'components/FormStep';

import {
  schoolAddressData,
  schoolContactsData,
  createSchoolData
} from 'store/atoms/create-school';
import useAtomCallback from 'hooks/use-atom-callback';

import { useAddSchoolMutation } from 'requests/mutations/schools';

import * as S from './styles';

const addressForm = <AddressForm jotaiState={schoolAddressData} />;
const contactsForm = <ContactsForm jotaiState={schoolContactsData} />;

const NewSchool = () => {
  const [session] = useSession();
  const mutation = useAddSchoolMutation(session);
  const resetForm = useResetAtom(createSchoolData);

  const { push } = useRouter();

  const handleFinish = useAtomCallback(async (get) => {
    const finalState = get(createSchoolData);

    const { contacts, ...finalData } = finalState;
    const contactsWithoutId = contacts.map(({ id: _, ...contact }) => contact);

    await mutation.mutateAsync({ ...finalData, contacts: contactsWithoutId });

    await push('/administration/schools');
    resetForm();
  }, []);

  return (
    <Base>
      <Heading>Nova escola</Heading>
      <SchoolBasicForm />

      <S.FormsSection>
        <FormStep
          items={[addressForm, contactsForm]}
          finishButtonText="Finalizar"
          onFinish={handleFinish}
        />
      </S.FormsSection>
    </Base>
  );
};

export default NewSchool;
