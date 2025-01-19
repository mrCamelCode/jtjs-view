import { describe, expect, test } from 'vitest';
import { ThemeService } from '../theme.service';

describe('ThemeService', () => {
  describe('lighten', () => {
    test(`the amount works correctly`, () => {
      expect(ThemeService.lighten('#292929', 0.1)).toBe('#424242');
    });
    test(`color is clamped to black`, () => {
      expect(ThemeService.lighten('#292929', -1)).toBe('#000000');
    });
    test(`color is clamped to white`, () => {
      expect(ThemeService.lighten('#292929', 1)).toBe('#ffffff');
    });
  });
  describe('darken', () => {
    test(`the amount works correctly`, () => {
      expect(ThemeService.darken('#292929', 0.1)).toBe('#0f0f0f');
    });
    test(`color is clamped to black`, () => {
      expect(ThemeService.darken('#292929', 1)).toBe('#000000');
    });
    test(`color is clamped to white`, () => {
      expect(ThemeService.darken('#292929', -1)).toBe('#ffffff');
    });
  });
});
