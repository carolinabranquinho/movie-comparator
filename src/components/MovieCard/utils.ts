export const splitIntoStacks = (totalBills: number, maxStackSize: number) => {
  const stacks = [];
  while (totalBills > 0) {
    const stackSize = Math.min(totalBills, maxStackSize);
    stacks.push(stackSize);
    totalBills -= stackSize;
  }
  return stacks;
};
