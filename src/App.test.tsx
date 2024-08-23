import App from "./App";
import { render } from "@testing-library/react";

describe("App", () => {
  it("displays welcome message", () => {
    const { container } = render(<App />);
    expect(container).toHaveTextContent("Welcome");
  });
});
