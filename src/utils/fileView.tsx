import {ReadDirItem, unlink} from "react-native-fs";
import {Button, Text, View} from "react-native";

interface Props {
  Directory: ReadDirItem,
  onClick?: () => void
}

function FileView({ Directory, onClick }: Props) {
  function Delete(){
      console.log({Directory})
      debugger;
      unlink(Directory.path)
          .then(() => {
              console.log('Directory Deleted')
          })
          .catch((error) => {
              console.log('Error deleting directory: ',error);
          });
  }
  return (
    <View>
      <Text onPress={() => onClick && onClick()}>{Directory.name}</Text>
      <Button onPress={() => Delete()}  title={"Deletar"}/>
    </View>
  );
}



export default FileView;
