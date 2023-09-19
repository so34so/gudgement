import { ImageSourcePropType } from "react-native";

export declare module CommonType {
  export type RootStackParamList = {
    default: undefined;

    /**
     * BottomTab Type
     */
    홈: undefined;
    상점: undefined;
    플레이: undefined;
    "내 정보": undefined;
    랭킹: undefined;

    /**
     * PlayScreen childs Type
     */
    Single: undefined;
    Multi: undefined;
    PlaySelect: undefined;

    /**
     * ShopScreen child Type
     */
    ShopNavigator: undefined;
    ShopEntrance: undefined;
    Shop: { category: string };
    Inventory: { category: string };

    /**
     * PlayScreen child Type
     */
    PlayNavigator: undefined;
    Play: undefined;
    Low: undefined;
    Middle: undefined;
    High: undefined;
    PlaySelect: undefined;
    /**
     * ShopScreen child Type
     */
    MyPageNavigator: undefined;
    MyPage: undefined;
    MyPageDetail: undefined;
    Pedometer: undefined;
    Analyze: undefined;
    SingleRecords: undefined;
    MultiRecords: undefined;
  };

  export type Titem = {
    id: number;
    itemName: string;
    itemContent: string;
    image: string | ImageSourcePropType;
    price: number;
    equipped: boolean;
    typeId: number;
    sold: boolean;
    unlocked: boolean;
  };
  export type TinvenItem = {
    invenId: number;
    itemId: number;
    itemName: string;
    itemContent: string;
    itemEffect: boolean;
    image: string;
    typeId: number;
    equipped: false;
  };
}
