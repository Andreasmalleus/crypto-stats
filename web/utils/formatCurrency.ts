const formatter = new Intl.NumberFormat('eu', {
  style : "currency",
  currency : "EUR",
})

export const formatCurrency = (val: number | null) => {
  if(val == null){
    return 0;
  }
  const formatted = formatter.format(val);
  return formatted.slice(1, formatted.length);
  };