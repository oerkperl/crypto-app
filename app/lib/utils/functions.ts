

export const formatMoney = (value: number): string => {
    if (value >= 1_000_000_000) {
      const billionValue = value / 1_000_000_000;
      return `${billionValue.toFixed(2)} B`;
    } else if (value >= 1_000_000) {
      const millionValue = value / 1_000_000;
      return `${millionValue.toFixed(2)} M`;
    } else {
      return `${value.toFixed(2)}`;
    }
  }
  
  
  