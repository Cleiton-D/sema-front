export type School = {
  id: string;
  name: string;
  inep_code: string;
};

export type SchoolWithEnrollCount = School & {
  enroll_count: string;
};
