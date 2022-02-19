export const formatDate = (date: number | string) => {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 10);
  };