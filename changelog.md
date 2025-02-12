# 2.1.1

- Add repo information.

# 2.1.0

- Removed `chroma-js`
  - It was adding an unacceptably large chunk to app bundles! We were using chroma for the `lighten` and `darken` methods on the `ThemeService`, and we're now just doing those conversions ourselves with significantly less code. We also exposed the color space conversion functions we added so you can use them, too 🙂
  - The results of `lighten` and `darken` should be _incredibly_ close to what was being produced before, but may be slightly different. In our own testing, we noticed that for more spicy colors (not pure white/black), the new methods would be within `1`, which we considered an acceptable margin.

# 2.0.0

## Breaking Changes

- Package exports to ESM-only.
- Dependencies moved to peer dependencies:
  - @jtjs/event: ^2.0.0,
  - chroma-js: ^3.0.0
