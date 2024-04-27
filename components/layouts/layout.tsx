import React, {ReactElement} from "react";
import {ScrollView, StyleSheet, Text, useColorScheme, View, Alert, Button} from "react-native";
import {styles} from "./styles.tsx";

function Layout({children}:{children:ReactElement}){

    return (
    <Text style={styles.cor}>Opa, bão? {children}</Text>
    )
}

export default Layout;
