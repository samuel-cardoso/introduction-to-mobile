const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Evita o Hermes parser avaliar `process.env.EXPO_ROUTER_APP_ROOT` antes do Babel
// substituir por string em require.context (erro comum com Expo Router + NativeWind).
config.transformer = {
  ...config.transformer,
  hermesParser: false,
  unstable_allowRequireContext: true,
};

module.exports = withNativeWind(config, { input: "./global.css" });
