import { Session } from 'next-auth';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

import { Classroom } from 'models/Classroom';

import { initializeApi } from 'services/api';

export const addClassroomQueryMutation = (
  old: Classroom[],
  newItem: Classroom
) => [...old, { ...newItem, uuid: uuidv4(), disabled: true }];

export const deleteClassroomQueryMutation = (
  old: Classroom[] | null,
  removed: Classroom
) => {
  if (!old) return old;

  return old.map((item) =>
    item.id === removed.id ? { ...item, disabled: true } : item
  );
};

type ListClassroomsFilters = {
  school_id?: string;
  grade_id?: string;
  class_period_id?: string;
};

export const listClassrooms = (
  session: Session | null,
  filters: ListClassroomsFilters = {}
) => {
  const api = initializeApi(session);

  const { school_id, ...params } = filters;

  return api
    .get<Classroom[]>(`/schools/${school_id || 'me'}/classrooms`, { params })
    .then((response) => response.data);
};

export const useListClassrooms = (
  session: Session | null,
  filters: ListClassroomsFilters = {}
) => {
  const key = `list-classrooms-${JSON.stringify(filters)}`;
  const result = useQuery(key, () => listClassrooms(session, filters));

  return {
    ...result,
    key,
    queryAddMutation: addClassroomQueryMutation,
    queryRemoveMutation: deleteClassroomQueryMutation
  };
};
