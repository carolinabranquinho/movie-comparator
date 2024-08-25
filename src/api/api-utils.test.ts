import { Movie } from "@/data/movies";
import { getFullImagePath } from "./api-utils";
import { Configuration } from "@/data/configuration";
import { NO_IMAGE_PATH } from "@/config/consts";

describe("API Utils", () => {
  describe("#getFullImagePath", () => {
    describe("with Configuration", () => {
      it("normalizes the secureBaseUrl trailing slash", () => {
        const imagePath = getFullImagePath(
          { posterPath: "poster.png" } as Movie,
          {
            secureBaseUrl: "https://example.com/",
            posterSizes: ["original"],
          } as Configuration,
        );

        expect(imagePath).toEqual("https://example.com/original/poster.png");
      });

      it("returns the full path of the image", () => {
        const imagePath = getFullImagePath(
          { posterPath: "poster.png" } as Movie,
          {
            secureBaseUrl: "https://example.com",
            posterSizes: ["original"],
          } as Configuration,
        );

        expect(imagePath).toEqual("https://example.com/original/poster.png");
      });

      it("returns our default NO image path if the movie has no poster", () => {
        const imagePath = getFullImagePath({} as Movie, {} as Configuration);

        expect(imagePath).toEqual(NO_IMAGE_PATH);
      });
    });

    describe("without Configuration", () => {
      it("returns our default NO image path", () => {
        const imagePath = getFullImagePath({} as Movie, null);

        expect(imagePath).toEqual(NO_IMAGE_PATH);
      });
    });
  });
});
