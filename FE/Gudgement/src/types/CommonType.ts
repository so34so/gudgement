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
    바텀: undefined;
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
    Shop: { category: string };
    Inventory: { category: string };

    /**
     * PlayScreen child Type
     */
    PlayNavigator: undefined;
    PlayMatchingWait: undefined;
    PlayMatchingQueue: undefined;
    PlaySelect: undefined;
    PlayGame: undefined;
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
    Splash: undefined;
    Login: undefined;
    SettingEmail: undefined;
    SettingName: undefined;
    SettingAccount: undefined;
    BottomTabNavigator: undefined;
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
    quantity: number;
    equipped: false;
  };

  export type Terror = {
    httpStatus: string;
    code: string;
    message: string;
  };

  export type TkakaoLogin = {
    id: number;
    nickname: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiration: string;
  };

  export type TloginData = {
    accessToken: string;
    refreshToken: string;
    id: number;
    email: string; // 계좌 연동 시 보낼 인증된 email
    info: number; // 로그인 절차 0 1 2 3 4
  };

  export type TemailCode = string;

  export type TemailUpdate = {
    id: number;
    email: string;
  };

  export type Taccount = {
    virtualAccountId?: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    accountHolder: string;
    email: string;
    balance: number;
    selected?: boolean;
  };

  export type Tuser = {
    memberId: number;
    email: string;
    nickname: string;
    emailApprove: boolean;
    nicknameApprove: boolean;
    setItems: [
      {
        itemId: number;
        itemName: string;
        itemContent: string;
        itemEffect: string;
        image: string;
        type: string;
        subtype: string;
      },
    ];
    tiggle: number;
    exp: number;
    level: number;
    pedometer: number;
    rate: {
      payment: number;
      rate: number;
      balance: number;
    };
  };

  export type Tplaymap = {
    ticle: number;
    image: string | ImageSourcePropType;
    title: string;
    tiggle: number;
    roleUser: string;
    nickName: string;
    description: string;
  };
  export type TplayCard = {
    cost: string;
    number: number;
    title: string;
  };
}
