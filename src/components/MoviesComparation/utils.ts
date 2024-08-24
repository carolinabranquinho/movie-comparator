import { last } from "lodash";

export const generateStacks = (elementsCount: number, maxStackSize: number) => {
  const stacks = [];
  while (elementsCount > 0) {
    const stackSize = Math.min(elementsCount, maxStackSize);
    stacks.push(stackSize);
    elementsCount -= stackSize;
  }
  return stacks;
};

export const splitIntoStacks = <T>(
  elements: T[],
  maxStackSize: number,
): T[][] => {
  const stacks: T[][] = [];

  elements.forEach((element) => {
    let lastStack = last(stacks);

    if (!lastStack || lastStack.length === maxStackSize) {
      lastStack = [];
      stacks.push(lastStack);
    }
    lastStack.push(element);
  });

  return stacks;
};
