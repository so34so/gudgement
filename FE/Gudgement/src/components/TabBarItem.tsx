import { View, Image } from "react-native";
import Jilta from "../assets/images/jilta.png";

interface ITabBarProps {
  item: string;
}

function TabBarItem({ item }: ITabBarProps) {
  return item === "플레이" ? (
    <View className="border-2 border-black top-3 w-[100%] h-[100%] flex justify-center items-center rounded-[999px] bg-white">
      <Image source={Jilta} className="absolute h-[80%] w-[80%] top-4" />
    </View>
  ) : (
    <View className="border-2 border-black top-5 w-[80%] h-[80%] flex justify-center items-center rounded-[999px] bg-gray-400">
      <View className="w-[90%] h-[90%] rounded-[999px] bg-gray-900">
        <Image source={Jilta} className="absolute h-full w-full bottom-4" />
      </View>
    </View>
  );
}
export default TabBarItem;
