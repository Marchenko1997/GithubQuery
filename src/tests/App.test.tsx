import "@testing-library/jest-dom";
import { render, screen, waitFor } from "./test-utils";
import App from "../App";

test("рендер заголовка и начального состояния", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/GitHub Issues Tracker/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Repo URL/i)).toBeInTheDocument();
  });
});
