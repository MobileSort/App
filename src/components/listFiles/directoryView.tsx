import { Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from "react";
import { Alert, Linking, Permission, PermissionsAndroid, Text } from "react-native";
import { ExternalStorageDirectoryPath, readDir, ReadDirItem } from "react-native-fs";
import FileView from "../../utils/fileView.tsx";
import { useNavigation } from "../../providers/navigationProvider.tsx";

interface Props {
  path: string,
  setPath: Dispatch<SetStateAction<string>>
}

function DirectoryView({ path, setPath }: Props) {
  const {actions} = useNavigation();

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
    });
  }

  function navigateToFolder(path: string) {
    actions.add(path);
    setPath(path);
  }

  return (
    <Fragment>
      <Text>{directoryName}</Text>
      {
        filesOnDirectory.map((item, index) =>
          <FileView
            key={index}
            Directory={item}
            onClick={() => navigateToFolder(item.path)}
          />
        )
      }
    </Fragment>
  );
}


export default DirectoryView;
