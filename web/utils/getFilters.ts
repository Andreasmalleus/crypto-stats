export const getFilters = (val: number) => {
    const prefixFilter = "brightness(0) saturate(100%)";
    return val > 0
      ? `${prefixFilter} invert(50%) sepia(53%) saturate(533%) hue-rotate(97deg) brightness(106%) contrast(95%)`
      : `${prefixFilter} brightness(0) saturate(100%) invert(27%) sepia(31%) saturate(5812%) hue-rotate(331deg) brightness(90%) contrast(94%)`;
  };