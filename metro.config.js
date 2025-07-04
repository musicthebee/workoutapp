const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
    assetExts: [
      'glb',
      'gltf',
      'png',
      'jpg',
      'jpeg',
      'svg',
      'bmp',
      'gif',
      'webp',
      'psd',
      'tiff',
      'ttf',
      'otf',
      'ttc',
      'woff',
      'woff2',
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
