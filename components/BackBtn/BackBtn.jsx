import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
function BackBtn({ back }) {
  return (
    <TouchableOpacity style={{ marginLeft: 20 }} onPress={back}>
      <Ionicons name="arrow-back" size={24} color="#212121" />
    </TouchableOpacity>
  );
}

export default BackBtn;
