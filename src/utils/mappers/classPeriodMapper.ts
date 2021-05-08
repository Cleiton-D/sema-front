import { ClassPeriod, FormattedClassPeriod } from 'models/ClassPeriod';

const translateDescription = (description: string) =>
  ({
    MORNING: 'Matutino',
    EVENING: 'Vespertino'
  }[description] || description);

export const classPeriodsMapper = (
  classPeriod: ClassPeriod
): FormattedClassPeriod => ({
  ...classPeriod,
  translated_description: translateDescription(classPeriod.description)
});
