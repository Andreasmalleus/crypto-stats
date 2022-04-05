export const formatCurrency = (val: number | null) => {
  if(val == null){
    return 0;
  }
  return val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, ",");
  };