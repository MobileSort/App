import { FlatList, Linking, Permission, PermissionsAndroid, Text, View } from "react-native";
import { Fragment, useEffect, useState } from "react";
import { DocumentDirectoryPath, readDir, ReadDirItem } from "react-native-fs";


function ListFiles() {
  const [filesOnDirectory, setFilesOnDirectory] = useState<ReadDirItem[]>([]);

  useEffect( function() {

    RequestAccessFiles() //TODO Change name later
  }, []);

  async function RequestAccessFiles(){
    const permissions = PermissionsAndroid.PERMISSIONS;
    const permissionGranted = await PermissionsAndroid.requestMultiple([
      permissions.READ_EXTERNAL_STORAGE,
        permissions.WRITE_EXTERNAL_STORAGE
      ]
    )
    console.log(permissionGranted)
    if(Object.keys(permissionGranted).some((key) => {
      return permissionGranted[key as Permission] !== PermissionsAndroid.RESULTS.GRANTED;
    })){
      console.log("Denied");
      // Linking.openSettings();
      return;
    }
    RequestFiles()
  }
  async function RequestFiles(){
    const path = "/";
    console.log(path)
    setFilesOnDirectory(await readDir(path));
  }
  return (
    <Fragment>
      {
        filesOnDirectory.map((item, index) => <FileView DirItem={item} key={index}/>)
      }
    </Fragment>
  );
}

function FileView({ DirItem }: { DirItem: ReadDirItem }) {
  return (
    <View>
      <Text>{DirItem.name}</Text>
    </View>
  );
}

export default ListFiles;
