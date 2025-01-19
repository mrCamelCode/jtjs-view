import { Event } from '@jtjs/event';
import { hexToHsl, hslToHex } from '../color.util';
import { Theme } from '../model/theme.model';

export type OnChangeThemeListener = (theme: Theme) => void;

/**
 * Provides means by which to register themes, change the active theme, and listen to
 * when the theme changes. Also includes helper methods for dealing with themes and colors.
 */
export class ThemeService {
  /**
   * Event for when the current theme changes or is modified.
   */
  static onChangeTheme: Event<OnChangeThemeListener> = new Event();

  /**
   * A classic light theme, featuring blue buttons and aqua accents.
   */
  static light: Theme = {
    name: 'jtjs-light',
    background: '#FEFEFE',
    foreground: '#EBEBEB',
    disabled: '#B8B8B8',
    text: '#333',
    accent: '#469BBF',
    outline: '#8F8F8F',
    button: '#5C7EC1',
    buttonText: '#EEE',
    focus: '#97ADD8',
    affirmative: '#3BAD61',
    affirmativeText: '#EEE',
    negative: '#CB3D3D',
    negativeText: '#EEE',
    warn: '#D67327',
    warnText: '#EEE',
    info: '#19417D',
    infoText: '#EEE',
  };

  /**
   * A dark theme that primarily uses shades of gray with pops of soft blue for buttons
   * and an aqua for accent.
   */
  static dark: Theme = {
    name: 'jtjs-dark',
    background: '#292929',
    foreground: '#474747',
    disabled: '#3D3D3D',
    text: '#EEE',
    accent: '#469BBF',
    outline: '#8F8F8F',
    button: '#5C7EC1',
    buttonText: '#EEE',
    focus: '#97ADD8',
    affirmative: '#3BAD61',
    affirmativeText: '#EEE',
    negative: '#CB3D3D',
    negativeText: '#EEE',
    warn: '#D67327',
    warnText: '#EEE',
    info: '#19417D',
    infoText: '#EEE',
  };

  /**
   * A lighter theme with an off-white background, deep chocolates for text, beautiful
   * blue buttons, and lovely lavender accents.
   */
  static parchment: Theme = {
    name: 'jtjs-parchment',
    background: '#EEECE7',
    foreground: '#D5D0C3',
    disabled: '#9B916F',
    text: '#36261A',
    accent: '#957186',
    outline: '#B4AC93',
    button: '#5299D3',
    buttonText: '#EEE',
    focus: '#957186',
    affirmative: '#3BAD61',
    affirmativeText: '#EEE',
    negative: '#CB3D3D',
    negativeText: '#EEE',
    warn: '#D67327',
    warnText: '#EEE',
    info: '#19417D',
    infoText: '#EEE',
  };

  /**
   * A default theme you can use to get going. This theme is NOT in the set
   * of registered themes, but will be used to set the theme CSS variables
   * by default. Same as {@link ThemeService.dark}.
   */
  static defaultTheme: Theme = ThemeService.dark;

  private static get isBrowser(): boolean {
    return !!globalThis.document;
  }

  private static _themes: Theme[] = [];
  public static get themes() {
    return [...ThemeService._themes];
  }

  private static _currentTheme: Theme = ThemeService.defaultTheme;
  /**
   * The currently active theme.
   */
  public static get currentTheme() {
    return ThemeService._currentTheme;
  }
  /**
   * Sets the current theme and invokes the `onChangeTheme` event.
   */
  private static set currentTheme(theme: Theme) {
    ThemeService._currentTheme = theme;
    ThemeService.updateCssVariables();

    ThemeService.onChangeTheme.trigger(theme);
  }

  /**
   * Registers the specified theme with the service, allowing the theme to be used as the current theme. If the theme
   * shares a name with an already-registered theme, nothing happens.
   *
   * @param theme - The new theme to register
   * @param autoSetCurrent - (Optional, defaults to `true`) Whether the current theme will automatically be set to the registered theme if this registration
   * is the first theme added to the service.
   */
  static registerTheme(theme: Theme, autoSetCurrent = true) {
    if (!ThemeService.hasTheme(theme.name)) {
      ThemeService._themes.push(theme);

      if (ThemeService._themes.length === 1 && autoSetCurrent) {
        ThemeService.currentTheme = theme;
      }
    }
  }

  /**
   * Changes the theme to the specified one if the specified theme has been registered with the service. If the specified
   * theme is found, the current theme is updated and the `onChangeTheme` event is invoked.
   *
   * @param themeName - The name of the theme to set as the current theme.
   */
  static changeTheme(themeName: string) {
    const theme = ThemeService.getTheme(themeName);

    if (theme) {
      ThemeService.currentTheme = theme;
    }
  }

  /**
   * Updates the specified theme, modifying its registered data.
   *
   * @param themeName - The theme to update.
   * @param newThemeData - The new theme data to use.
   */
  // Note: Maybe instead of requiring that they call this, just use a proxy that watches
  // for sets to the object fields and triggers the event when one changes?
  static updateTheme(themeName: string, newThemeData: Partial<Omit<Theme, 'name'>>) {
    const theme = ThemeService.getTheme(themeName);

    if (theme) {
      Object.assign(theme, newThemeData);

      ThemeService.currentTheme = theme;
    }
  }

  /**
   * Lightens a hex color.
   *
   * @param hexColor - The color to lighten, expressed in hex.
   * @param amount - The amount by which to lighten the color. This is a value
   * between 0-1. The default for this value is the same value used by the service to generate
   * lightened color variants for theme colors.
   *
   * @returns The lightened color.
   */
  static lighten(hexColor: string, amount = 0.1): string {
    const hsl = hexToHsl(hexColor);

    return hslToHex({ ...hsl, lightness: hsl.lightness + amount });
  }

  /**
   * Darkens a hex color.
   *
   * @param hexColor - The color to lighten, expressed in hex.
   * @param amount - The amount by which to darken the color. This is a value
   * between 0-1. The default for this value is the same value used by the service to generate
   * darkened color variants for theme colors.
   *
   * @returns The darkened color.
   */
  static darken(hexColor: string, amount = 0.1) {
    return ThemeService.lighten(hexColor, -amount);
  }

  private static getTheme(themeName: string): Theme | undefined {
    return ThemeService._themes.find((t) => t.name === themeName);
  }

  private static hasTheme(themeName: string): boolean {
    return ThemeService._themes.some((t) => t.name === themeName);
  }

  private static updateCssVariables() {
    if (!ThemeService.isBrowser) {
      return;
    }

    const root = document.documentElement;

    Object.entries(ThemeService._currentTheme).forEach(([themeKey, color]) => {
      if (themeKey !== 'name' && color) {
        root.style.setProperty(`--jtjs-theme-${themeKey}`, color);
        root.style.setProperty(`--jtjs-theme-${themeKey}-darkened`, ThemeService.darken(color));
        root.style.setProperty(`--jtjs-theme-${themeKey}-lightened`, ThemeService.lighten(color));
      }
    });
  }

  /**
   * Get the CSS variables set up to start so they're available in the event
   * the consumer never explicitly registers anything with the service. This
   * should place the default theme into the CSS vars.
   */
  private static _constructor = (() => {
    ThemeService.updateCssVariables();
  })();
}
