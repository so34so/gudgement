import Map1 from "../assets/images/map1.png";
import Map2 from "../assets/images/map2.png";
import Map3 from "../assets/images/map3.png";
import { CommonType } from "../types/CommonType";
import { ImageSourcePropType } from "react-native";
const map1: ImageSourcePropType = Map1 as ImageSourcePropType;
const map2: ImageSourcePropType = Map2 as ImageSourcePropType;
const map3: ImageSourcePropType = Map3 as ImageSourcePropType;
export const mapInfoArray: CommonType.Tplaymap[] = [
  {
    title: "휴화산",
    description: "용암 활동이 멈춘 화산 지형",
    image: map1,
    ticle: 100,
  },
  {
    title: "활화산",
    description: "열기가 뜨겁게 올라오는\n 화산 지형",
    image: map2,
    ticle: 300,
  },
  {
    title: "불지옥",
    description: "둘 중 하나는 지옥을\n경험하는 지형",
    image: map3,
    ticle: 500,
  },
];
