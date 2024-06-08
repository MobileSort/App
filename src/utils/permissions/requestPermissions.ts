import BleManager from "react-native-ble-manager";
import { Permission, PermissionsAndroid, PermissionStatus, Platform } from "react-native";

interface Result {
  permission: Permission,
  result: boolean
}

const requestPermissions = () => {
  const promises: Promise<void>[] = [];
  promises.push(BleManager.enableBluetooth());
  promises.push(getGeneralPermissions());
  return promises;
};

const getGeneralPermissions = (): Promise<void> => {

  if (Platform.OS === "android" && Platform.Version >= 23) {
    const permissionsToGet = [
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
    ];


    return new Promise((resolve, reject) => {
      checkMultiplePermissions([...permissionsToGet]).then(results => {
        const pendingPermissions: Promise<PermissionStatus>[] = [];
        results.forEach((response) => {
          if (response.result) {
            return;
          }
          pendingPermissions.push(
            new Promise((resolve) => {
              PermissionsAndroid.request(response.permission).then((status) => {
                resolve(status);
              });
            })
          );
        });
        if (pendingPermissions.length === 0) {
          resolve();
        }
        Promise.all(pendingPermissions).then((results) => {
          if (results.some((result) => result != PermissionsAndroid.RESULTS.GRANTED)) {
            reject();
            return;
          }
          resolve();
        });
      });
    });
  }
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const checkMultiplePermissions = (permissions: Permission[]): Promise<Result[]> => {
  const promises: Promise<boolean>[] = [];
  for (const permission in permissions) {
    promises.push(new Promise((resolve, reject) => {
      PermissionsAndroid.check(permission as Permission).then((permitted) => {
        resolve(permitted);
      });
    }));
  }
  return new Promise((resolve, reject) => {
    Promise.all(promises).then((results) => {
      const responses = permissions.map((permission, index) => {
        return {
          permission,
          result: results[index]
        } as Result;
      });
      resolve(responses);
    });
  });
};

export default requestPermissions;
