import { ReadDirItem } from "react-native-fs";
import { Text, View } from "react-native";

interface Props {
  Directory: ReadDirItem,
  onClick?: () => void
}

function FileView({ Directory, onClick }: Props) {
  return (
    <View>
      <Text onPress={() => onClick && onClick()}>{Directory.name}</Text>
    </View>
  );
}

export default FileView;
