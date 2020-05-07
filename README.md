### Build Instructions

You will need Android Studio and an android simulator installed in Android Studio. Linked below is the full build tutorial from Facebook about how to build a React Native app.

https://reactnative.dev/docs/environment-setup

Use the React Native CLI Quickstart option, along with your OS and desired mobile OS to simulate (this project was built using Windows and an Android simulator, no other options have been tested, but they should theoretically work)

A quick rundown of the steps is here

1. Clone the repo
2. Go to the main repo folder
3. Run ```npm install```
4. Run ```npx react-native run-android```


This should buil the code and launch the simulator (it does take some time)

If any errors occur, try reading through the full tutorial from Facebook

A few notes. First, this has not been tested through an iOS simulator, however it should still work (adding in a step after npm install, go to the ios/ directory and run ```pod install```). Secondly, if using an AMD processor, there is a lot of work you need to do behind the scenes such as enabling virtualization in BIOS, however this is detailed in the Facebook writeup. 


A few things about the app. There is no ability to upload a user avatar, however this is simply a missing piece. Messages also do not save when leaving a chat, but this is due to not using a true backend service and only saving messages locally (the same applies to group chats made).