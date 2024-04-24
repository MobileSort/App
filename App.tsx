import React, {ReactElement} from "react";
import {ScrollView, StyleSheet, Text, useColorScheme, View} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
  scrollTrigger: {
    paddingTop: 1200,
    paddingBottom: 1200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Text{
    //
    // },
  },
});

function App(): ReactElement {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getName = (name: string): string => {
    return "Oi " + name;
  };
  return (
    <ScrollView style={backgroundStyle} id={"welcome"}>
      <Text>Bem-Vindo ao mobile sort {getName("Cauan")}!</Text>
      <ScrollTrigger />
    </ScrollView>
  );
}

const ScrollTrigger = () => {
  return (
    <View style={styles.scrollTrigger}>
      <Text>Im centered</Text>
    </View>
  );
};

export default App;
