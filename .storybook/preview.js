import { globalStyles, lightTheme, darkTheme } from '../src/stitches.config'
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

globalStyles()

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  multipleThemesStitches: {
    values: [
      {
        name: 'Light',
        theme: lightTheme
      },
      {
        name: 'Dark',
        theme: darkTheme
      }
    ]
  },
}