import { test } from "@playwright/test";
import { HomePage } from "./page-object-models/home-page";

test.describe("Home Page", () => {
  test.describe("Comparing Movies", () => {
    test("Adding and removing movies", async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      await homePage.searchMovie("Despicable");
      await homePage.selectMovie("Despicable Me 4");
      await homePage.verifyMovieCard("Despicable Me 4");
      await homePage.removeMovie("Despicable Me 4");
    });
  });

  test.describe("Shared URL with movie id", () => {
    test("Loads movie card", async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto("331446");

      await homePage.verifyMovieCard("Sharknado 3: Oh Hell No!");
    });
  });
});
