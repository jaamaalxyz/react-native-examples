import { NPOLY } from './npoly/colors';
import { RAINBOW } from './rainbow/colors';
import { SOLARIZED } from './solarized/colors';

export interface Color {
  colorName: string;
  hexCode: string;
}

export interface ColorPalette {
  paletteName: string;
  colors: Color[];
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    paletteName: 'Solarized',
    colors: SOLARIZED,
  },
  {
    paletteName: 'Rainbow',
    colors: RAINBOW,
  },
  {
    paletteName: 'Npoly',
    colors: NPOLY,
  },
];

export { SOLARIZED, RAINBOW, NPOLY };
