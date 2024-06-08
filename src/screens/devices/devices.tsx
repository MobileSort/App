import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import BleManager from "react-native-ble-manager";

const Devices = () => {
  const [connectedDevices, setConnectedDevices] = useState()

  useEffect(() => {
    getConnectedPeripherals();
  }, []);

  const getConnectedPeripherals = () => {
    BleManager.getConnectedPeripherals().then((peripherals) => {
      console.log({peripherals})
    })
  }

  return(
    <View>
      {}
    </View>
  )
}

export default Devices;
