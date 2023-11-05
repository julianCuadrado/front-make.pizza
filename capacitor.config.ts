import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.pizza.make',
  appName: 'MakePizza',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
