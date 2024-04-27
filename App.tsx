import React, {ReactElement} from "react";
import {ScrollView, StyleSheet, Text, useColorScheme, View, Alert, Button} from "react-native";
import Layout from "./components/layouts/layout.tsx";

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

  const alerta = () => {
    Alert.alert('Title', 'Message')
  }
  const getName = (name: string): string => {
    return "Oi " + name;
  };
  return (
    <ScrollView style={backgroundStyle} id={"welcome"}>
      <Text>Bem-Vindo ao mobile sort {getName("Cauan")}!</Text>
      <Button testID={'Botao'} title={'2-Button Alert'} onPress={alerta} />
      <Layout><Text>OI</Text></Layout>
    </ScrollView>
  );
}


export default App;
