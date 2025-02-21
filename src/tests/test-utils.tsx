import { ReactNode } from "react";
import {
  render as rtlRender,
  RenderOptions,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { act } from "react";

const customRender = async (ui: ReactNode, options?: RenderOptions) => {
  await act(async () => {
    rtlRender(<Provider store={store}>{ui}</Provider>, options);
  });
};

export * from "@testing-library/react";
export { customRender as render, screen, fireEvent, waitFor };
