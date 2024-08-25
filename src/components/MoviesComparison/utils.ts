import { last } from "lodash";

/**
 * Split elements into stacks of a determined length
 *
 */
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
