function getQuantityToChange(fractionedQuantity, currentAmount) {
  if (!fractionedQuantity) {
    return 1;
  } else {
    switch (true) {
      case currentAmount > 9.9:
        return 1;
      case currentAmount > 4.4:
        return 0.5;
      default:
        return 0.1;
    }
  }
}

export function getQuantityToRemove(fractionedQuantity, currentAmount) {
  const quantityToRemove = getQuantityToChange(
    fractionedQuantity,
    currentAmount
  );
  return Number((currentAmount - quantityToRemove).toFixed(2));
}
export function getQuantityToAdd(fractionedQuantity, currentAmount) {
  const quantityToAdd = getQuantityToChange(fractionedQuantity, currentAmount);

  return Number((currentAmount + quantityToAdd).toFixed(2));
}
