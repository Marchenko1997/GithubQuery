import { render, screen, fireEvent } from "./test-utils";
import SearchBar from "../components/SearchBar/SearchBar";
import { store } from "../redux/store";
import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

test("изменение repoUrl в store", async () => {
  render(<SearchBar />);

  await waitFor(() => {
    expect(screen.getByPlaceholderText(/Enter Repo URL/i)).toBeInTheDocument();
  });

  const input = screen.getByPlaceholderText(/Enter Repo URL/i);
  fireEvent.change(input, {
    target: { value: "https://github.com/user/repo" },
  });

  expect(store.getState().repo.url).toBe("https://github.com/user/repo");
});
