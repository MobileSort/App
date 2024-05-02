import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import Router from "./src/components/router.tsx";

function App(): ReactElement {

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
