import {
  View,
  Image,
  ImageSourcePropType,
  ImageBackground,
} from "react-native";
import { BOTTOM_TAB_IMAGE } from "../utils/common";
import { IMAGE_URL } from "@env";
import NavBlur from "../assets/images/navBlur.png";
console.log(IMAGE_URL);

interface ITabBarProps {
  item: string;
  index: number;
}
function TabBarItem({ item, index }: ITabBarProps) {
  const navBlur: ImageSourcePropType = NavBlur as ImageSourcePropType;
  return (
    <>
      <ImageBackground
        className="absolute w-full h-[160px] z-0 top-[-20px]"
        source={navBlur}
      />
      <>
        {item !== "랭킹" ? (
          <View className="w-full h-[100%] top-4">
            <Image
              source={{
                uri: `${IMAGE_URL}${BOTTOM_TAB_IMAGE[index]}`,
              }}
              className="absolute h-[120%] w-[120%] bottom-4"
            />
          </View>
        ) : (
          <View className="w-full h-full top-4 [filter:blur(40px)]">
            <Image
              source={{
                uri: `${IMAGE_URL}${BOTTOM_TAB_IMAGE[index]}`,
              }}
              className="absolute h-full w-full bottom-4"
            />
          </View>
        )}
      </>
    </>
  );
}
export default TabBarItem;
