# App
React Native app for Mobile Sort

### Step 1: Install dependencies

```sh
npm install
```

### Step 2: Install detox cli


### Step 2: build test

Build the demo project using one of the `npm` scripts.

```sh
detox build --configuration <platform: ios || android>.<device type: att || (sim || emu)>.debug
```

### Step 3: Execute Tests

```sh
npm detox test --configuration <platform: ios || android>.<device type: att || (sim || emu)>.debug
```

## Running this project in Debug mode

The project’s tests can also be executed with the app running in debug mode (mainly, with JavaScript code getting bundled on-the-fly using the `metro` server).

For that, first run the `metro` server:

```sh
npm start
```
