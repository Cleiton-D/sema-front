import { atom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';
import { AddressFormData } from 'models/Address';
import { ContactFormData } from 'models/Contact';

type BasicSchoolType = {
  name: string;
  inep_code: string;
};

export const basicSchoolData = atomWithReset<BasicSchoolType>(
  {} as BasicSchoolType
);

export const schoolAddressData = atomWithReset<AddressFormData>(
  {} as AddressFormData
);

export const schoolContactsData = atomWithReset<ContactFormData[]>([]);

type SchoolFormData = BasicSchoolType & {
  address: AddressFormData;
  contacts: ContactFormData[];
};

export const createSchoolData = atom<
  SchoolFormData,
  SchoolFormData | typeof RESET
>(
  (get) => {
    const basicData = get(basicSchoolData);
    const address = get(schoolAddressData);
    const contacts = get(schoolContactsData);

    return {
      ...basicData,
      address,
      contacts
    };
  },
  (_get, set, newValue) => {
    if (newValue === RESET) {
      set(basicSchoolData, newValue);
      set(schoolAddressData, newValue);
      set(schoolContactsData, newValue);
      return;
    }

    const { address, contacts, ...basic } = newValue;
    set(basicSchoolData, basic);
    set(schoolAddressData, address || {});
    set(schoolContactsData, contacts || {});
  }
);
