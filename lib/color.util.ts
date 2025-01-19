type Range = [number, number];

const HUE_RANGE: Range = [0, 1];
const SATURATION_RANGE: Range = [0, 1];
const LIGHTNESS_RANGE: Range = [0, 1];

const RED_RANGE: Range = [0, 1];
const GREEN_RANGE: Range = [0, 1];
const BLUE_RANGE: Range = [0, 1];

export interface Hsl {
  /**
   * 0-1
   */
  hue: number;
  /**
   * 0-1
   */
  saturation: number;
  /**
   * 0-1
   */
  lightness: number;
}

export interface Rgb {
  /**
   * 0-1
   */
  red: number;
  /**
   * 0-1
   */
  green: number;
  /**
   * 0-1
   */
  blue: number;
}

export function hexToHsl(hex: string): Hsl {
  return rgbToHsl(hexToRgb(hex));
}

export function hslToHex(hsl: Hsl): string {
  return rgbToHex(hslToRgb(hsl));
}

export function hexToRgb(hex: string): Rgb {
  const reg = /^#?(?<r>[\da-f]{1,2})(?<g>[\da-f]{1,2})(?<b>[\da-f]{1,2})$/i;

  const { groups: { r = '', g = '', b = '' } = {} } = reg.exec(hex) ?? {};

  const lengthenShorthand = (hexNumber: string): string => {
    return hexNumber.padEnd(2, hexNumber);
  };

  return clampRgb({
    red: parseInt(lengthenShorthand(r), 16) / 255,
    green: parseInt(lengthenShorthand(g), 16) / 255,
    blue: parseInt(lengthenShorthand(b), 16) / 255,
  });
}

export function rgbToHex(rgb: Rgb): string {
  const { red, green, blue } = clampRgb(rgb);

  return `#${[red, green, blue]
    .map((channel) => Math.floor(channel * 255).toString(16))
    // Account for shortening.
    .map((hexNum) => hexNum.padStart(2, '0'))
    .join('')}`;
}

export function hslToRgb(hsl: Hsl): Rgb {
  const { hue, saturation, lightness } = clampHsl(hsl);

  let red = 0;
  let green = 0;
  let blue = 0;

  if (saturation === 0) {
    red = green = blue = lightness; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;

      return p;
    };

    var q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    var p = 2 * lightness - q;
    red = hue2rgb(p, q, hue + 1 / 3);
    green = hue2rgb(p, q, hue);
    blue = hue2rgb(p, q, hue - 1 / 3);
  }

  return clampRgb({ red, green, blue });
}

export function rgbToHsl(rgb: Rgb): Hsl {
  const { red, green, blue } = clampRgb(rgb);

  const min = Math.min(red, green, blue);
  const max = Math.max(red, green, blue);

  const average = (max + min) / 2;

  const hsl: Hsl = { hue: average, saturation: average, lightness: average };

  if (max === min) {
    hsl.hue = 0;
    hsl.saturation = 0;
  } else {
    const difference = max - min;
    hsl.saturation = hsl.lightness > 0.5 ? difference / (2 - max - min) : difference / (max + min);

    switch (max) {
      case red:
        hsl.hue = (green - blue) / difference + (green < blue ? 6 : 0);
        break;
      case green:
        hsl.hue = (blue - red) / difference + 2;
        break;
      case blue:
        hsl.hue = (red - green) / difference + 4;
        break;
    }

    hsl.hue /= 6;
  }

  return clampHsl({
    hue: hsl.hue,
    saturation: hsl.saturation,
    lightness: hsl.lightness,
  });
}

function clamp(value: number, range: [number, number]): number {
  const [min, max] = range;

  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }

  return value;
}

function clampHsl({ hue, saturation, lightness }: Hsl): Hsl {
  return {
    hue: clamp(hue, HUE_RANGE),
    saturation: clamp(saturation, SATURATION_RANGE),
    lightness: clamp(lightness, LIGHTNESS_RANGE),
  };
}

function clampRgb({ red, green, blue }: Rgb): Rgb {
  return {
    red: clamp(red, RED_RANGE),
    green: clamp(green, GREEN_RANGE),
    blue: clamp(blue, BLUE_RANGE),
  };
}
