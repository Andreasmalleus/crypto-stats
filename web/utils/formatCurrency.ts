export const formatCurrency = (val: number) => {
    return val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, ",");
  };