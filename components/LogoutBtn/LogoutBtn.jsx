import { MaterialIcons } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";

function LogoutBtn({ logout }) {
  return (
    <TouchableOpacity style={{ marginRight: 20 }} onPress={logout}>
      <MaterialIcons name="logout" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
}
export default LogoutBtn;
