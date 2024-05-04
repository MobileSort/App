import { Button, View } from "react-native";
import { Fragment, useContext, useEffect, useState } from "react";
import { ExternalStorageDirectoryPath } from "react-native-fs";
import { NavigationProvider, useNavigation } from "../../providers/navigationProvider.tsx";
import DirectoryView from "../../components/listFiles/directoryView.tsx";

function ListFiles() {

  return (
    <NavigationProvider>
      <ListFilesComponent />
    </NavigationProvider>
  );
}

function ListFilesComponent(){
  const {actions, history} = useNavigation();

  const [selectecDirectory, setSelectecDirectory] = useState<string>(ExternalStorageDirectoryPath);

  useEffect(() => {
    actions.add(ExternalStorageDirectoryPath);
  }, []);
  return(
    <View>
      {history.length > 1 &&
        <Button title={"<- Go Back"} onPress={() => {
          const directoryLastIndex = actions.pop().slice(-1);
          setSelectecDirectory(directoryLastIndex[0]);
        }} />}
      <DirectoryView path={selectecDirectory} setPath={setSelectecDirectory} />
    </View>
  )
}


export default ListFiles;
