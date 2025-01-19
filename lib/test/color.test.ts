import { describe, expect, test } from 'vitest';
import { hexToHsl, hexToRgb, hslToHex, hslToRgb, rgbToHex, rgbToHsl } from '../color.util';

describe('color.util', () => {
  describe('hslToHex', () => {
    test.each`
      hsl                                              | expected
      ${{ hue: 0, saturation: 0, lightness: 0 }}       | ${'#000000'}
      ${{ hue: 0.2, saturation: 0, lightness: 0 }}     | ${'#000000'}
      ${{ hue: 1, saturation: 0, lightness: 0 }}       | ${'#000000'}
      ${{ hue: 0, saturation: 0, lightness: 0.06 }}    | ${'#0f0f0f'}
      ${{ hue: 0.1, saturation: 0.2, lightness: 0.2 }} | ${'#3d3528'}
      ${{ hue: 1, saturation: 0, lightness: 1 }}       | ${'#ffffff'}
      ${{ hue: 1, saturation: 0, lightness: 1 }}       | ${'#ffffff'}
      ${{ hue: 0.2, saturation: 1, lightness: 1 }}     | ${'#ffffff'}
    `('is $expected when hsl is $hsl', ({ hsl, expected }) => {
      const result = hslToHex(hsl);

      expect(result).toBe(expected);
    });
  });
  describe('hslToRgb', () => {
    test.each`
      hsl                                              | expected
      ${{ hue: 0, saturation: 0, lightness: 0 }}       | ${{ red: 0, green: 0, blue: 0 }}
      ${{ hue: 0.2, saturation: 0, lightness: 0 }}     | ${{ red: 0, green: 0, blue: 0 }}
      ${{ hue: 1, saturation: 0, lightness: 0 }}       | ${{ red: 0, green: 0, blue: 0 }}
      ${{ hue: 0.1, saturation: 0.2, lightness: 0.2 }} | ${{ red: 0.24, green: 0.21, blue: 0.16 }}
      ${{ hue: 1, saturation: 0, lightness: 1 }}       | ${{ red: 1, green: 1, blue: 1 }}
      ${{ hue: 1, saturation: 0, lightness: 1 }}       | ${{ red: 1, green: 1, blue: 1 }}
      ${{ hue: 0.2, saturation: 1, lightness: 1 }}     | ${{ red: 1, green: 1, blue: 1 }}
    `('is $expected when hsl is $hsl', ({ hsl, expected }) => {
      const result = hslToRgb(hsl);

      expect(result.red).toBeCloseTo(expected.red);
      expect(result.green).toBeCloseTo(expected.green);
      expect(result.blue).toBeCloseTo(expected.blue);
    });
  });
  describe('hexToRgb', () => {
    test.each`
      hex          | expected
      ${'#000000'} | ${{ red: 0, green: 0, blue: 0 }}
      ${'#000'} | ${{ red: 0, green: 0, blue: 0 }}
      ${'#604620'} | ${{ red: 0.38, green: 0.27, blue: 0.13 }}
      ${'#ffffff'} | ${{ red: 1, green: 1, blue: 1 }}
      ${'#fff'} | ${{ red: 1, green: 1, blue: 1 }}
    `('is $expected when hex is $hex', ({ hex, expected }) => {
      const result = hexToRgb(hex);

      expect(result.red).toBeCloseTo(expected.red);
      expect(result.green).toBeCloseTo(expected.green);
      expect(result.blue).toBeCloseTo(expected.blue);
    });
  });
  describe('hexToHsl', () => {
    test.each`
      hex          | expected
      ${'#000000'} | ${{ hue: 0, saturation: 0, lightness: 0 }}
      ${'#604620'} | ${{ hue: 0.1, saturation: 0.5, lightness: 0.25 }}
      ${'#ffffff'} | ${{ hue: 0, saturation: 0, lightness: 1 }}
    `('is $expected when hex is $hex', ({ hex, expected }) => {
      const result = hexToHsl(hex);

      expect(result.hue).toBeCloseTo(expected.hue);
      expect(result.saturation).toBeCloseTo(expected.saturation);
      expect(result.lightness).toBeCloseTo(expected.lightness);
    });
  });
  describe('rgbToHex', () => {
    test.each`
      rgb                                       | expected
      ${{ red: 0, green: 0, blue: 0 }}          | ${'#000000'}
      ${{ red: 0.5, green: 0.5, blue: 0.5 }}    | ${'#7f7f7f'}
      ${{ red: 0.06, green: 0.06, blue: 0.06 }} | ${'#0f0f0f'}
      ${{ red: 1, green: 1, blue: 1 }}          | ${'#ffffff'}
    `('is $expected when rgb is $rgb', ({ rgb, expected }) => {
      const result = rgbToHex(rgb);

      expect(result).toBe(expected);
    });
  });
  describe('rgbToHsl', () => {
    test.each`
      rgb                                     | expected
      ${{ red: 0, green: 0, blue: 0 }}        | ${{ hue: 0, saturation: 0, lightness: 0 }}
      ${{ red: 0.25, green: 0.5, blue: 0.5 }} | ${{ hue: 0.5, saturation: 0.33, lightness: 0.375 }}
      ${{ red: 1, green: 1, blue: 1 }}        | ${{ hue: 0, saturation: 0, lightness: 1 }}
    `('is $expected when rgb is $rgb', ({ rgb, expected }) => {
      const result = rgbToHsl(rgb);

      expect(result.hue).toBeCloseTo(expected.hue);
      expect(result.saturation).toBeCloseTo(expected.saturation);
      expect(result.lightness).toBeCloseTo(expected.lightness);
    });
  });
});
