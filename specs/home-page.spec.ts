import { test } from "@playwright/test";
import { HomePage } from "./page-object-models/home-page";
import {
  CONFIGURATION_FIXTURE,
  MOVIE_DESPICABLE_ME_4_FIXTURE,
  MOVIE_SHARKNADO_FIXTURE,
  SEARCH_DESPICABLE_FIXTURE,
} from "./fixtures";

test.describe("Home Page", () => {
  test.describe("Comparing Movies", () => {
    test("Adding and removing movies", async ({ page }) => {
      await page.route(
        "**/*/3/search/movie?query=Despicable*",
        async (route) => {
          await route.fulfill({ json: SEARCH_DESPICABLE_FIXTURE });
        },
      );
      await page.route("**/*/3/configuration*", async (route) => {
        await route.fulfill({ json: CONFIGURATION_FIXTURE });
      });
      await page.route("**/*/3/movie/519182*", async (route) => {
        await route.fulfill({ json: MOVIE_DESPICABLE_ME_4_FIXTURE });
      });

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
      await page.route("**/*/3/configuration*", async (route) => {
        await route.fulfill({ json: CONFIGURATION_FIXTURE });
      });
      await page.route("**/*/3/movie/33144*", async (route) => {
        await route.fulfill({ json: MOVIE_SHARKNADO_FIXTURE });
      });

      const homePage = new HomePage(page);
      await homePage.goto("33144");

      await homePage.verifyMovieCard("Sharknado 3: Oh Hell No!");
    });
  });
});
