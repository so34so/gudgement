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

    /**
     * ShopScreen child Type
     */
    ShopNavigator: undefined;
    ShopEntrance: undefined;
    Shop: undefined;
    Inventory: undefined;

    /**
     * MyPage child Type
     */
    MyPageNavigator: undefined;
    MyPage: undefined;
    MyPageDetail: undefined;
    Pedometer: undefined;
    Analyze: undefined;
    SingleRecords: undefined;
    MultiRecords: undefined;

    /**
     * Login child Type
     */
    Login: undefined;
    SettingEmail: undefined;
    SettingName: undefined;
    SettingAccount: undefined;
    BottomTabNavigator: undefined;
  };
  export type Titem = {
    title: string;
    description: string;
    image: ImageSourcePropType;
    price: number;
  };
}
