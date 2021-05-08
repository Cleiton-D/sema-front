import { atom } from 'jotai';
import { AddressFormData } from 'models/Address';
import { ContactFormData } from 'models/Contact';

type BasicSchoolType = {
  name: string;
  inep_code: string;
};

export const basicSchoolData = atom<BasicSchoolType>({} as BasicSchoolType);

export const schoolAddressData = atom<AddressFormData>({} as AddressFormData);

export const schoolContactsData = atom<ContactFormData[]>([]);

type SchoolFormData = BasicSchoolType & {
  address: AddressFormData;
  contacts: ContactFormData[];
};

export const createSchoolData = atom<SchoolFormData>((get) => {
  const basicData = get(basicSchoolData);
  const address = get(schoolAddressData);
  const contacts = get(schoolContactsData);

  return {
    ...basicData,
    address,
    contacts
  };
});
