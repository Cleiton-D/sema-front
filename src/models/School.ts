import { Address } from './Address';
import { Contact } from './Contact';

export type School = {
  id: string;
  name: string;
  inep_code: string;
  address_id: string;
  branch_id: string;
  created_at: string;
  contacts: Contact[];
  address: Address;
};

export type CompleteSchool = School & {
  enroll_count: number;
  classrooms_count: number;
};

export type SchoolWithEnrollCount = Omit<School, 'address' | 'contacts'> & {
  enroll_count: string | number;
};

export type SchoolContact = {
  id: string;
  school_id: string;
  contact_id: string;
  created_at: string;
  updated_at: string;
};
