import { splitIntoStacks } from "./utils";

describe("MoviesComparison utils", () => {
  describe("#splitIntoStacks", () => {
    it("splits elements into stacks evenly", () => {
      const elements = ["1", "2", "3", "4"];
      const stacks = splitIntoStacks(elements, 2);

      expect(stacks.length).toEqual(2);
      expect(stacks[0]).toEqual(expect.arrayContaining(["1", "2"]));
      expect(stacks[1]).toEqual(expect.arrayContaining(["3", "4"]));
    });

    it("splits elements into stacks even if there are not enough elements", () => {
      const elements = ["1", "2", "3", "4"];
      const stacks = splitIntoStacks(elements, 10);

      expect(stacks.length).toEqual(1);
      expect(stacks[0]).toEqual(expect.arrayContaining(elements));
    });

    it("splits elements into stacks even if there is an odd number of elements", () => {
      const elements = ["1", "2", "3", "4", "5"];
      const stacks = splitIntoStacks(elements, 4);

      expect(stacks.length).toEqual(2);
      expect(stacks[0]).toEqual(expect.arrayContaining(["1", "2", "3", "4"]));
      expect(stacks[1]).toEqual(expect.arrayContaining(["5"]));
    });
  });
});
