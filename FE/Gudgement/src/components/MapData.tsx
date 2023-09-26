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
    title: "Map 1",
    description: "맵 설명이 들어갈 자리 1",
    image: map1,
    ticle: "x100",
  },
  {
    title: "Map 2",
    description: "맵 설명이 들어갈 자리 2",
    image: map2,
    ticle: "x300",
  },
  {
    title: "Map 3",
    description: "맵 설명이 들어갈 자리 3",
    image: map3,
    ticle: "x500",
  },
];
