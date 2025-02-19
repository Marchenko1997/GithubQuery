import "@testing-library/jest-dom";

// Импорт TextEncoder и TextDecoder для среды Node.js
import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";

// Добавляем TextEncoder в глобальную область, если его нет
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}

// Добавляем TextDecoder с приведением типов
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = NodeTextDecoder as unknown as {
    new (label?: string, options?: TextDecoderOptions): TextDecoder;
    prototype: TextDecoder;
  };
}

// Мокаем глобальный fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;
