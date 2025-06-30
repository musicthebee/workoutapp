cd android && ./gradlew clean && cd .. && npx react-native run-android
adb reverse tcp:8081 tcp:8081
npx react-native start --reset-cache
npx react-native log-android && npx react-native log-ios
