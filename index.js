/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { initializeApp, getApps } from '@react-native-firebase/app';
import App from './App';
import { name as appName } from './app.json';

// Initialize Firebase before registering the app
if (!getApps().length) {
  initializeApp();
}

AppRegistry.registerComponent(appName, () => App);
