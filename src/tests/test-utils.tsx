import { ReactNode } from "react";
import {
  render as rtlRender,
  RenderOptions,
  screen,
  fireEvent,
  waitFor,
  act, // 🔥 Добавляем act сюда
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";


export { screen, fireEvent, waitFor, act }; 

// Функция для рендера с redux store
const customRender = async (ui: ReactNode, options?: RenderOptions) => {
  await act(async () => {
    rtlRender(<Provider store={store}>{ui}</Provider>, options);
  });
};


export { customRender as render };


import "@testing-library/jest-dom";
