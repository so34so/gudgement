import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";

import { Config } from "react-native-config";

import { CommonType } from "../types/CommonType";
import { ANALYZE_MONTH_IMAGE, textShadow } from "../utils/common";
import TagBoxSmall from "../components/TagBoxSmall";

function AnalyzeDetail() {
  // const { errorMessage } = route.params;

  const { data: userData } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
  });

  const { data: userAnalyzeMonth } = useQuery<CommonType.TanalyzeMonth>({
    queryKey: ["userAnalyzeMonth"],
  });

  const [userSpend, setUserSpend] = useState(0);

  useEffect(() => {
    if (userAnalyzeMonth && userAnalyzeMonth.ranking !== null) {
      const calculate = userAnalyzeMonth.ranking / userAnalyzeMonth.totalMember;
      if (calculate < 0.2) {
        setUserSpend(1);
      }
      if (calculate < 0.6 && calculate >= 0.2) {
        setUserSpend(2);
      }
      if (calculate <= 1 && calculate >= 0.6) {
        setUserSpend(3);
      }
    }
  }, [userAnalyzeMonth]);

  const userGudge = ["초보 거지", "찐 거지", "무난한 거지", "분발해야 할 거지"];

  return (
    <View className="w-full h-full flex justify-center items-center">
      <ImageBackground
        source={{
          uri: `${Config.IMAGE_URL}/asset/mypageBackground.png`,
        }}
        resizeMode="cover"
        className="flex w-full h-full"
      >
        <View className="absolute bg-black30 w-screen h-screen" />
        <ScrollView className="mx-4 space-y-2">
          <SafeAreaView className="mt-4 space-y-2 py-4 flex flex-col overflow-hidden justify-start items-center w-fill h-fill rounded-3xl bg-white90 border-solid border-[3px] border-darkgray">
            <View className="flex flex-row justify-center items-center space-x-10">
              <View className="flex flex-col space-y-2">
                <View className="-mt-4 -mb-2 -ml-6">
                  <TagBoxSmall
                    text="월별 결산"
                    img={`${Config.IMAGE_URL}/asset/analysisMoreIcon.png`}
                  />
                </View>
                <View className="flex justify-start items-start">
                  <View className="flex flex-row">
                    <Text className="font-PretendardExtraBold text-darkgray text-2lg">
                      {userData?.nickname}
                    </Text>
                    <Text className="font-PretendardBold text-darkgray text-2lg">
                      {" "}
                      님의
                    </Text>
                  </View>
                  <View className="flex flex-row">
                    <Text className="font-PretendardExtraBold text-darkgray text-2lg">
                      {userAnalyzeMonth?.month}월{" "}
                    </Text>
                    <Text className="font-PretendardBold text-darkgray text-2lg">
                      결산 결과예요.
                    </Text>
                  </View>
                </View>
                <View className="flex justify-start items-start">
                  <View className="flex flex-row">
                    <Text className="font-PretendardBold text-darkgray50 text-sm">
                      나의{" "}
                    </Text>
                    <Text className="font-PretendardBold text-black70 text-sm">
                      {userAnalyzeMonth?.year ? userAnalyzeMonth?.year : "0"}년{" "}
                      {userAnalyzeMonth?.month ? userAnalyzeMonth?.month : "0"}
                      월을
                    </Text>
                  </View>
                  <View className="flex flex-row">
                    <Text className="font-PretendardBold text-black70 text-sm">
                      소비 데이터로{" "}
                    </Text>
                    <Text className="font-PretendardBold text-darkgray50 text-sm">
                      돌아보세요.
                    </Text>
                  </View>
                </View>
              </View>
              <Image
                source={{
                  uri: `${Config.IMAGE_URL}/asset/monthCharacter.png`,
                }}
                className="h-48 w-24"
              />
            </View>
          </SafeAreaView>

          <SafeAreaView className="space-y-6 p-4 flex flex-col overflow-hidden justify-center items-start w-fill h-fill rounded-3xl bg-bluesky border-solid border-[3px] border-darkgray">
            <View className="flex justify-start items-start space-y-2">
              <View className="flex flex-row mx-2">
                <Text
                  className="font-PretendardExtraBold text-white text-xs"
                  style={textShadow}
                >
                  {userData?.nickname}
                </Text>
                <Text className="font-PretendardBold text-white90 text-xs">
                  {" "}
                  님의 소비는
                </Text>
              </View>
              <View className="flex flex-row justify-start items-end bg-bluesky px-4 py-2 rounded-xl border-solid border-[3px] border-lightsky">
                {userAnalyzeMonth?.ranking !== null ? (
                  <View className="flex flex-row justify-start items-end">
                    <Text
                      className="font-PretendardExtraBold text-white text-sm"
                      style={textShadow}
                    >
                      {userAnalyzeMonth?.totalMember
                        ? userAnalyzeMonth?.totalMember
                        : "0"}
                      명{" "}
                    </Text>
                    <Text className="font-PretendardBold text-white90 text-sm">
                      중
                    </Text>
                    <Text
                      className="font-PretendardBold text-white text-2lg"
                      style={textShadow}
                    >
                      {" "}
                      {userAnalyzeMonth?.ranking
                        ? userAnalyzeMonth?.ranking
                        : "0"}
                      위{" "}
                    </Text>
                    <Text className="font-PretendardBold text-white90 text-sm">
                      예요.
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text className="font-PretendardBold text-white90 text-2xs">
                      해당 월에 설정된 목표 금액이 없습니다.
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View className="w-full px-2 border-solid border-t-[2px] border-lightsky60" />
            <View className="flex justify-between w-full px-2">
              <View className="w-[100px] h-[100px] flex justify-center items-center rounded-full bg-lightsky border-solid border-[3px] border-white20">
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL}${ANALYZE_MONTH_IMAGE[userSpend]}`,
                  }}
                  className="h-[70px] w-[70px]"
                />
              </View>
              <View className="-mt-6 flex justify-start items-end w-full space-y-3">
                <View className="flex flex-row">
                  <Text
                    className="font-PretendardExtraBold text-white text-3xl mr-1"
                    style={textShadow}
                  >
                    {userGudge[userSpend]}
                  </Text>
                  <Text
                    className="font-PretendardBold text-white text-3xl"
                    style={textShadow}
                  >
                    를
                  </Text>
                </View>
                <Text
                  className="font-PretendardBold text-white text-3xl"
                  style={textShadow}
                >
                  여기서 뵙네요
                </Text>
              </View>
            </View>
            <View className="w-full px-2 border-solid border-t-[2px] border-lightsky60" />
            <View className="flex justify-start items-start">
              <View className="flex flex-row">
                <Text className="font-PretendardBold text-white70 text-2xs">
                  * 해당 월에 설정한{" "}
                </Text>
                <Text className="font-PretendardExtraBold text-white text-2xs">
                  목표 소비 금액
                </Text>
                <Text className="font-PretendardBold text-white70 text-2xs">
                  과
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="font-PretendardBold text-white70 text-2xs ml-3">
                  비슷한 사용자를 기준으로 기록된 순위예요.
                </Text>
              </View>
            </View>
          </SafeAreaView>

          <SafeAreaView className="space-y-6 p-4 flex flex-col overflow-hidden justify-center items-start w-fill h-fill rounded-3xl bg-white90 border-solid border-[3px] border-darkgray">
            <View className="flex justify-start items-start space-y-2">
              <View className="flex mx-2">
                <Text className="font-PretendardExtraBold text-black text-md mb-3">
                  소비 점검 : 고가
                </Text>
                <View className="flex flex-row">
                  <Text className="font-PretendardExtraBold text-black70 text-xs">
                    {userData?.nickname}
                  </Text>
                  <Text className="font-PretendardBold text-black50 text-xs">
                    {" "}
                    님의 소비 중
                  </Text>
                </View>
              </View>
              <View className="flex flex-col space-y-2 w-[340px] justify-evenly items-start bg-white90 px-4 py-4 rounded-xl border-solid border-[3px] border-sub03">
                <View className="flex flex-row justify-start items-end">
                  <View className="flex justify-center items-center bg-buy rounded-lg border-solid border-[3px] border-white">
                    <Text className="font-PretendardExtraBold text-black text-lg px-1">
                      가장 비싼
                    </Text>
                  </View>
                  <Text className="font-PretendardBold text-black50 text-sm pb-1">
                    {" "}
                    내역은
                  </Text>
                </View>
                <View className="flex flex-row justify-start items-end">
                  <Text className="font-PretendardExtraBold text-black text-2lg px-1 border-solid border-b-[3px] border-buy">
                    {userAnalyzeMonth?.bestDestination}
                  </Text>
                </View>
                <View className="pt-20 w-full px-2 border-solid border-b-[2px] border-sub03" />
                <View className="mt-3 flex justify-start items-end w-full">
                  <View className="flex flex-row">
                    <Text className="font-PretendardExtraBold text-red text-3xl mr-1">
                      -{" "}
                      {userAnalyzeMonth?.bestAmount
                        ? userAnalyzeMonth?.bestAmount.toLocaleString("ko-KR")
                        : 0}
                    </Text>
                    <Text className="font-PretendardBold text-red text-3xl">
                      원
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>

          <SafeAreaView className="space-y-6 p-4 flex flex-col overflow-hidden justify-center items-start w-fill h-fill rounded-3xl bg-white90 border-solid border-[3px] border-darkgray">
            <View className="flex justify-start items-start space-y-2">
              <View className="flex mx-2">
                <Text className="font-PretendardExtraBold text-black text-md mb-3">
                  소비 점검 : 빈도
                </Text>
                <View className="flex flex-row justify-start items-end">
                  <Text className="font-PretendardExtraBold text-black70 text-xs mr-[2px]">
                    {userData?.nickname}
                  </Text>
                  <Text className="font-PretendardBold text-black50 text-xs">
                    님의{" "}
                  </Text>
                  <Text className="font-PretendardExtraBold text-black70 text-xs mr-[2px]">
                    방앗간
                  </Text>
                  <Text className="font-PretendardBold text-black50 text-xs">
                    은
                  </Text>
                </View>
              </View>
              <View className="flex flex-col w-[340px] justify-evenly items-start bg-white90 px-4 py-4 rounded-xl border-solid border-[3px] border-sub03">
                <View className="flex flex-row mb-1 justify-start items-end">
                  <Text className="font-PretendardExtraBold text-black text-2lg mr-1 px-1 border-solid border-b-[3px] border-buy">
                    {userAnalyzeMonth?.frequencyDestination}
                  </Text>
                  <Text className="font-PretendardBold text-black50 text-sm pb-1">
                    에서
                  </Text>
                </View>
                <View className="flex flex-row mt-2 justify-start items-end">
                  <View className="flex justify-center items-center mx-1 bg-buy rounded-lg border-solid border-[3px] border-white">
                    <Text className="font-PretendardBold text-black text-2lg">
                      {" "}
                      {userAnalyzeMonth?.frequencyCount}번{" "}
                    </Text>
                  </View>
                  <Text className="font-PretendardBold text-black50 text-sm m-1">
                    지출했어요.
                  </Text>
                </View>

                <View className="pt-20 w-full px-2 border-solid border-b-[2px] border-sub03" />
                <View className="mt-3 flex justify-start items-end w-full">
                  <View className="flex flex-row justify-start items-end">
                    <Text className="font-PretendardBold text-darkgray50 text-lg">
                      총
                    </Text>
                    <Text className="font-PretendardExtraBold text-red text-3xl mr-1">
                      {" "}
                      -{" "}
                      {userAnalyzeMonth?.frequencyAmount
                        ? userAnalyzeMonth?.frequencyAmount.toLocaleString(
                          "ko-KR",
                        )
                        : "0"}
                    </Text>
                    <Text className="font-PretendardExtraBold text-red text-3xl">
                      원
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>

          <SafeAreaView className="mb-4 space-y-6 p-4 flex flex-col overflow-hidden justify-center items-start w-fill h-fill rounded-3xl bg-bluesky border-solid border-[3px] border-darkgray">
            <View className="flex justify-start items-start space-y-1">
              <View className="flex flex-row mx-2">
                <Text
                  className="font-PretendardExtraBold text-white text-xs"
                  style={textShadow}
                >
                  {userData?.nickname}
                </Text>
                <Text className="font-PretendardBold text-white90 text-xs">
                  {" "}
                  님의 {userAnalyzeMonth?.month}월 소비를
                </Text>
              </View>
              <View className="flex flex-row mx-2">
                <Text className="font-PretendardBold text-white90 text-xs">
                  {userAnalyzeMonth?.month}월의{"  "}
                </Text>
                <Text
                  className="font-PretendardExtraBold text-white text-xs"
                  style={textShadow}
                >
                  한 달 전
                </Text>
                <Text className="font-PretendardBold text-white90 text-xs">
                  {" "}
                  소비와 비교해요.
                </Text>
              </View>
            </View>
            <View className="w-full px-2 border-solid border-t-[2px] border-lightsky60" />
            <View className="flex flex-col w-full justify-center items-start bg-bluesky px-4 py-2 rounded-xl border-solid border-[3px] border-lightsky">
              <View className="flex flex-col justify-start items-start p-4">
                <View className="flex flex-row">
                  <Text
                    className="font-PretendardExtraBold text-white text-xs mr-1"
                    style={textShadow}
                  >
                    {userAnalyzeMonth?.year}년{" "}
                    {userAnalyzeMonth?.month && userAnalyzeMonth?.month - 1}월
                  </Text>
                  <Text className="font-PretendardBold text-white90 text-xs">
                    총 소비 금액
                  </Text>
                </View>
                <Text
                  className="font-PretendardBold text-white text-2lg"
                  style={textShadow}
                >
                  {userAnalyzeMonth?.lastMonthAmount
                    ? userAnalyzeMonth?.lastMonthAmount.toLocaleString("ko-KR")
                    : "0"}{" "}
                  원
                </Text>
              </View>
              {userAnalyzeMonth?.lastMonthAmountRate !== null ? (
                <>
                  <View className="overflow-hidden flex flex-row h-[30px] w-[100%] rounded-full">
                    <View
                      style={{
                        width: `${userAnalyzeMonth?.lastMonthAmountRate || 0}%`,
                      }}
                      className="absolute z-20 flex flex-row h-[30px] w-[100%] bg-white50 bg-mainColor"
                    />
                    <View className="absolute z-1 flex flex-row h-[30px] w-[100%] bg-black50" />
                  </View>
                  <Text
                    className="font-PretendardBold text-white90 text-2xs mt-2"
                    style={{
                      paddingLeft: `${userAnalyzeMonth?.lastMonthAmountRate || 0 > 100
                          ? 76
                          : userAnalyzeMonth?.lastMonthAmountRate || 0 - 6
                        }%`,
                    }}
                  >
                    {userAnalyzeMonth?.lastMonthAmountRate} %
                  </Text>
                </>
              ) : (
                <View className="mb-3 mx-3 flex flex-row justify-start items-end bg-bluesky px-4 py-2 rounded-xl border-solid border-[3px] border-lightsky">
                  <Text className="font-PretendardBold text-white90 text-2xs">
                    {userAnalyzeMonth?.month - 1}월에 설정된 목표 금액이
                    없습니다.
                  </Text>
                </View>
              )}

              <View className="flex flex-col justify-start items-start p-4">
                <View className="flex flex-row">
                  <Text
                    className="font-PretendardExtraBold text-white text-xs mr-1"
                    style={textShadow}
                  >
                    {userAnalyzeMonth?.year}년 {userAnalyzeMonth?.month}월
                  </Text>
                  <Text className="font-PretendardBold text-white90 text-xs">
                    총 소비 금액
                  </Text>
                </View>
                <Text
                  className="font-PretendardBold text-white text-2lg"
                  style={textShadow}
                >
                  {userAnalyzeMonth?.thisMonthAmount
                    ? userAnalyzeMonth?.thisMonthAmount.toLocaleString("ko-KR")
                    : "0"}{" "}
                  원
                </Text>
              </View>
              {userAnalyzeMonth?.thisMonthAmountRate !== null ? (
                <>
                  <View className="overflow-hidden flex flex-row h-[30px] w-[100%] rounded-full">
                    <View
                      style={{
                        width: `${userAnalyzeMonth?.thisMonthAmountRate || 0}%`,
                      }}
                      className="absolute z-20 flex flex-row h-[30px] w-[100%] bg-white50 bg-mainColor"
                    />
                    <View className="absolute z-1 flex flex-row h-[30px] w-[100%] bg-black50" />
                  </View>
                  <Text
                    className="font-PretendardBold text-white90 text-2xs mt-2"
                    style={{
                      paddingLeft: `${userAnalyzeMonth?.thisMonthAmountRate || 0 > 100
                          ? 76
                          : userAnalyzeMonth?.thisMonthAmountRate || 0 - 6
                        }%`,
                    }}
                  >
                    {userAnalyzeMonth?.thisMonthAmountRate} %
                  </Text>
                </>
              ) : (
                <View className="mb-3 mx-3 flex flex-row justify-start items-end bg-bluesky px-4 py-2 rounded-xl border-solid border-[3px] border-lightsky">
                  <Text className="font-PretendardBold text-white90 text-2xs">
                    {userAnalyzeMonth?.month}월에 설정된 목표 금액이 없습니다.
                  </Text>
                </View>
              )}
            </View>
            <View className="w-full px-2 border-solid border-t-[2px] border-lightsky60" />
            <View className="flex justify-start items-start">
              <View className="flex flex-row">
                <Text className="font-PretendardBold text-white70 text-2xs">
                  * 해당 월에 설정한{" "}
                </Text>
                <Text className="font-PretendardExtraBold text-white text-2xs mr-[2px]">
                  목표 소비 금액
                </Text>
                <Text className="font-PretendardBold text-white70 text-2xs">
                  을
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="font-PretendardBold text-white70 text-2xs ml-3">
                  기준으로 책정된 비율이예요.
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

export default AnalyzeDetail;
