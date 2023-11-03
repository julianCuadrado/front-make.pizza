import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MakePizza',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    "GoogleMaps": {
      "apiKey": "AIzaSyDKiZItTUfrtSRIJd0a8Uc7pJaCSNEX3mk"
    }
  }
};

export default config;
