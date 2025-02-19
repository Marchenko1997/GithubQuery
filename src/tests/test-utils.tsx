import "@testing-library/jest-dom";
import { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { act } from "react-dom/test-utils";

const customRender = async (ui: ReactNode, options?: RenderOptions) => {
  await act(async () => {
    render(<Provider store={store}>{ui}</Provider>, options);
  });
};

export * from "@testing-library/react";
export { customRender as render };
