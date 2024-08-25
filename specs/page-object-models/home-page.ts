import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly movieCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByLabel("Search for a movie title");
    this.movieCard = page.getByTestId("movie-card");
  }

  async goto(movieId?: string) {
    await this.page.goto(movieId ? `/?movie=${movieId}` : "/");

    expect(this.page.getByText("Welcome", { exact: true })).toBeVisible();
  }

  async searchMovie(query: string) {
    await this.searchBox.pressSequentially(query);
  }

  async selectMovie(movie: string) {
    const movieOption = this.page.getByText(movie, { exact: true });
    await movieOption.waitFor();
    expect(movieOption).toBeVisible();
    movieOption.click();
  }

  async removeMovie(movie: string) {
    // Firefox doesn't seem to like clicking on SVG "buttons" :)
    await this.page
      .getByRole("button", { name: `Remove movie: ${movie}` })
      .focus();
    await this.page
      .getByRole("button", { name: `Remove movie: ${movie}` })
      .press("Enter");

    expect(this.page.getByTestId("movie-card")).not.toBeVisible();
  }

  async verifyMovieCard(title: string) {
    await this.page.getByTestId("movie-card").waitFor();
    expect(this.page.getByText("Popularity")).toBeVisible();
    expect(this.page.getByText("Revenue")).toBeVisible();
    expect(this.page.getByText("Budget")).toBeVisible();
    expect(this.page.getByText(title, { exact: true })).toBeVisible();
  }
}
