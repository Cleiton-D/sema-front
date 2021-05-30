export const masks = {
  time: (value: string) => {
    const newValue = value.replace(/\D/g, '');

    if (newValue.length <= 2) return newValue;

    const start = newValue.substring(0, 2);
    const end = newValue.substring(2, 4);

    return `${start}:${end}`;
  }
};
