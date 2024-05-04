import { Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from "react";
import {Alert, Linking, Permission, PermissionsAndroid, ScrollView, Text} from "react-native";
import { ExternalStorageDirectoryPath, readDir, ReadDirItem } from "react-native-fs";
import FileView from "../../utils/fileView.tsx";
import { useNavigation } from "../../providers/navigationProvider.tsx";
import ModalAddDirectory from "../modalAddDirectory"

interface Props {
  path: string,
  setPath: Dispatch<SetStateAction<string>>
}

function DirectoryView({ path, setPath }: Props) {
  const { actions, history } = useNavigation();

  const [filesOnDirectory, setFilesOnDirectory] = useState<ReadDirItem[]>([]);

  const directoryLastIndex = path.split("/").slice(-1);
  const directoryName = directoryLastIndex[0] == "0" ? "Root" : directoryLastIndex[0];

  useEffect(function() {
    RequestAccessFiles(); //TODO Change name later
  }, []);

  useEffect(() => {
    RequestFiles();
  }, [path]);

  function RequestAccessFiles() {
    const permissions = PermissionsAndroid.PERMISSIONS;
    PermissionsAndroid.requestMultiple([
        permissions.READ_EXTERNAL_STORAGE,
        permissions.WRITE_EXTERNAL_STORAGE
      ]
    ).then((permissionGranted) => {
      if (Object.keys(permissionGranted).some((key) => {
        return permissionGranted[key as Permission] !== PermissionsAndroid.RESULTS.GRANTED;
      })) {
        Alert.alert("File access denied", "Access your phone settings to permit file access", [
          { text: "Open Settings", onPress: () => Linking.openSettings() },
          { text: "Dismiss" }
        ]);
        return;
      }
    });
  }

  function RequestFiles() {
    readDir(path).then((directories) => {
      setFilesOnDirectory(directories);
    }).catch(() => {
      Alert.alert("Error", "The app couldn't read this folder", [
        {
          text: "Ok", onPress: () => {
            if(history.length <= 1){
              return;
            }
            const lastDirectory = history.slice(-2)[0]
            actions.pop();
            setPath(lastDirectory)
          }
        }
      ]);
    });
  }

  function navigateToFolder(path: string) {
    actions.add(path);
    setPath(path);
  }

  return (
    <Fragment>
      <Text>{directoryName}</Text>
      <ScrollView>
       <ModalAddDirectory
           path={path}
           onClick={() => RequestFiles()}
       />
      {
        filesOnDirectory.map((item, index) =>
          <FileView
            key={index}
            Directory={item}
            onClick={() => navigateToFolder(item.path)}
          />
        )
      }
     </ScrollView>
    </Fragment>
  );
}

export default DirectoryView;
