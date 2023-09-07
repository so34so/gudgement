import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
interface Iitems {
  id: number;
  title: string;
  image: string;
}
function ShopItems({
  items,
  modalVisible,
  setModalVisible,
}: {
  items: Iitems[];
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return items.map(ele => (
    <TouchableOpacity
      key={ele.id}
      activeOpacity={0.5}
      onPress={() => setModalVisible(!modalVisible)}
      className="w-[80px] h-[80px] border-2 border-black rounded-[10px] bg-white m-2 flex-nowrap"
    >
      <Text className="p-1">{ele.title}</Text>
    </TouchableOpacity>
  ));
}
export default ShopItems;
