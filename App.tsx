import React, { ReactElement, useEffect } from "react";
import { NativeModules, StyleSheet, View } from "react-native";
import Router from "./src/components/router.tsx";
import requestPermissions from "./src/utils/permissions/requestPermissions.ts";

const App = (): ReactElement => {
  useEffect(() => {
    Promise.all(requestPermissions()) ;
  }, []);

  return (
    <View style={styles.container}>
      <Router/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc2c2",
  }
})


export default App;
