import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "react-native-chart-kit";
import ModalDropdown, { PositionStyle } from "react-native-modal-dropdown";
import reactotron from "reactotron-react-native";

import AnalysisBox from "../components/AnalysisBox";
import CustomModal from "../components/CustomModal";
import NavigationButton from "../components/NavigationButton";
import TagBoxSmall from "../components/TagBoxSmall";

import fetchApi from "../utils/tokenUtils";
import { Config } from "react-native-config";

import { CommonType } from "../types/CommonType";

function Analyze() {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1,
  );
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  const {
    data: userData,
    isLoading,
    refetch: refetchUser,
  } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
    enabled: false,
  });

  const { data: userAnalyzeMonth } = useQuery({
    queryKey: ["userAnalyzeMonth", selectedYear, selectedMonth],
    queryFn: () => fetchAnalyzeMonth(selectedYear, selectedMonth),
  });

  useEffect(() => {
    refetchUser();
    if (selectedYear > 0 && selectedMonth > 0 && selectedDay > 0) {
      fetchAnalyzeChart();
    }
  }, []);

  const [percent, setPercent] = useState(userData?.rate.rate as number);
  const [spend, setSpend] = useState<{
    text: string;
    color: string;
    img: number;
  }>({
    text: "",
    color: "",
    img: 0,
  });

  const [dayOptions, setDayOptions] = useState<string[]>([]);
  const yearOptions = ["2020년", "2021년", "2022년", "2023년"];
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const monthOptions = Array.from(
    { length: 12 },
    (_, index) => (index + 1).toString() + "월",
  );

  useEffect(() => {
    if (selectedYear > 0 && selectedMonth > 0) {
      setDayOptions(
        Array.from(
          {
            length: getDaysInMonth(selectedYear, selectedMonth),
          },
          (_, index) => (index + 1).toString() + "일",
        ),
      );
      reactotron.log!("날짜", dayOptions);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  const handleSelectDate = useCallback(
    (type: string) => (indexString: string, value: string) => {
      const numberValue = Number(value.replace(type, ""));
      switch (type) {
        case "년":
          setSelectedYear(numberValue);
          break;
        case "월":
          setSelectedMonth(numberValue);
          break;
        case "일":
          setSelectedDay(numberValue);
          break;
        default:
          break;
      }
      reactotron.log!(type + " 선택", value);
    },
    [],
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [chartData, setChartData] = useState<CommonType.TanalyzeChart>({
    year: 0,
    month: 0,
    week: 0,
    data: {
      type: "",
      labels: ["월", "화", "수", "목", "금", "토", "일"],
      dateSet: {
        amount: [0, 0, 0, 0, 0, 0, 0],
        color: [true, true, true, true, true, true, true],
      },
    },
  });

  const fetchAnalyzeChart = async () => {
    if (
      (selectedYear === currentDate.getFullYear() &&
        selectedMonth > currentDate.getMonth() + 1) ||
      (selectedYear === currentDate.getFullYear() &&
        selectedMonth >= currentDate.getMonth() + 1 &&
        selectedDay > currentDate.getDate())
    ) {
      setModalText("선택할 수 없는 날짜 입니다.");
      openModal();
      setSelectedMonth(currentDate.getMonth() + 1);
      setSelectedDay(currentDate.getDate());
      return;
    }
    reactotron.log!("날짜: ", selectedYear, selectedMonth, selectedDay);
    try {
      const response: AxiosResponse<CommonType.TanalyzeChart> =
        await fetchApi.post(
          `${Config.API_URL}/mypage/${selectedYear}-${selectedMonth}-${selectedDay}`,
          null,
        );
      reactotron.log!("fetchAnalyzeChart", response.data);
      setChartData(response.data);
    } catch (error) {
      setModalText(
        `${selectedYear}-${selectedMonth}-${selectedDay} 날짜 그래프 불러오기에 실패하였습니다. 다시 시도해주세요.`,
      );
      openModal();
      reactotron.log!("fetchAnalyzeChart", error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const fetchAnalyzeMonth = async (year: number, month: number) => {
    if (
      (selectedYear === currentDate.getFullYear() &&
        selectedMonth > currentDate.getMonth() + 1) ||
      (selectedYear === currentDate.getFullYear() &&
        selectedMonth >= currentDate.getMonth() + 1 &&
        selectedDay > currentDate.getDate())
    ) {
      return;
    }
    try {
      const sendBE = {
        year: year,
        month: month,
        virtualAccountId: userData?.virtualAccountId,
        monthOverconsumption: userData?.monthOverconsumption,
      };
      const response: AxiosResponse<CommonType.TanalyzeMonth> =
        await fetchApi.post(`${Config.API_URL}/mypage/month/analyze`, sendBE);
      reactotron.log!("fetchAnalyzeMonth", response.data);
      return response.data;
    } catch (error) {
      setModalText("월별결산 불러오기에 실패하였습니다. 다시 시도해주세요.");
      openModal();
      reactotron.log!("fetchAnalyzeMonth", error);
    }
  };

  const handleFetchAnalyze = async () => {
    navigation.navigate("AnalyzeDetail", {
      year: selectedYear,
      month: selectedMonth,
    });
  };

  const getDropdownStyle = (): ViewStyle => ({
    backgroundColor: "#79B4FF",
    borderRadius: 10,
    borderColor: "#3190FF",
    borderWidth: 2,
    overflow: "hidden",
  });

  const renderRow = (
    option: string,
    index: number,
    isSelected?: boolean,
  ): ReactNode | null | undefined => {
    const rowStyle: StyleProp<ViewStyle> = {
      backgroundColor: isSelected ? "#79B4FF" : "#3190FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingLeft: 12,
      paddingTop: 4,
      paddingBottom: 4,
    };

    const textStyle: TextStyle = {
      color: "#ffffff",
      fontFamily: "Pretendard-Bold",
    };

    return (
      <View style={rowStyle}>
        <Text style={textStyle}>{option}</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const getAdjustFrameFunc = (width: number, height: number) => {
    return (style: PositionStyle) => {
      style.top = style.top ? style.top + 10 : 10;
      style.width = width;
      style.height = height;
      return style;
    };
  };

  return (
    <View className="w-full h-full flex justify-center items-center">
      <ImageBackground
        source={{
          uri: `${Config.IMAGE_URL}/asset/mypageBackground.png`,
        }}
        resizeMode="cover"
        className="flex w-full h-full"
      >
        <CustomModal
          alertText={modalText}
          visible={modalVisible}
          closeModal={closeModal}
        />
        <View className="absolute bg-black30 w-screen h-screen" />
        <View className="py-2 flex flex-row justify-between items-center">
          <TagBoxSmall
            text={`${userData?.nickname} 님의 소비 분석`}
            img={`${Config.IMAGE_URL}/asset/analysisIcon.png`}
          />
        </View>
        <View className="flex flex-col overflow-hidden justify-center items-center w-fill h-fill mx-4 rounded-3xl bg-white90 border-solid border-[3px] border-darkgray">
          <View className="-mt-1">
            <AnalysisBox
              ProgressBarVisible={false}
              spend={spend}
              setSpend={setSpend}
              percent={percent}
              setPercent={setPercent}
            />
          </View>
          <View className="w-full">
            <View className="flex flex-row justify-between items-center mx-3 my-3">
              <View className="flex flex-row justify-start items-center bg-lightsky60 p-[3px] rounded-xl border-solid border-[3px] border-lightsky">
                <ModalDropdown
                  options={yearOptions}
                  onSelect={handleSelectDate("년")}
                  defaultIndex={selectedYear - 1}
                  defaultValue={`${selectedYear}년`}
                  dropdownStyle={getDropdownStyle()}
                  renderRow={(option, index, isSelected) =>
                    renderRow(option, Number(index), isSelected)
                  }
                  adjustFrame={getAdjustFrameFunc(86, 114)}
                >
                  <View className="bg-bluesky w-[88px] px-1 py-[2px] rounded-lg flex flex-row justify-end items-center border-solid border-lightsky border-[2px]">
                    <Text
                      className="font-PretendardBold text-white px-2 py-[2px] text-2xs"
                      numberOfLines={1}
                    >
                      {selectedYear}년
                    </Text>
                    <Image
                      source={{
                        uri: `${Config.IMAGE_URL}/asset/dropdownArrow.png`,
                      }}
                      className="h-[9px] w-[11px] mr-1"
                    />
                  </View>
                </ModalDropdown>
                <ModalDropdown
                  options={monthOptions}
                  onSelect={handleSelectDate("월")}
                  defaultIndex={selectedMonth - 1}
                  defaultValue={`${selectedMonth}월`}
                  dropdownStyle={getDropdownStyle()}
                  renderRow={(option, index, isSelected) =>
                    renderRow(option, Number(index), isSelected)
                  }
                  adjustFrame={getAdjustFrameFunc(64, 220)}
                >
                  <View className="bg-bluesky w-[66px] py-[2px] px-1 rounded-lg flex flex-row justify-end items-center border-solid border-lightsky border-[2px]">
                    <Text
                      className="font-PretendardBold text-white px-2 py-[2px] text-2xs"
                      numberOfLines={1}
                    >
                      {selectedMonth}월
                    </Text>
                    <Image
                      source={{
                        uri: `${Config.IMAGE_URL}/asset/dropdownArrow.png`,
                      }}
                      className="h-[9px] w-[11px] mr-1"
                    />
                  </View>
                </ModalDropdown>
                <ModalDropdown
                  options={dayOptions}
                  onSelect={handleSelectDate("일")}
                  defaultIndex={selectedDay - 1}
                  defaultValue={`${selectedDay}일`}
                  dropdownStyle={getDropdownStyle()}
                  renderRow={(option, index, isSelected) =>
                    renderRow(option, Number(index), isSelected)
                  }
                  adjustFrame={getAdjustFrameFunc(66, 220)}
                >
                  <View className="bg-bluesky w-[68px] px-[1px] py-[2px] rounded-lg flex flex-row justify-end items-center border-solid border-lightsky border-[2px]">
                    <Text
                      className="font-PretendardBold text-white px-2 py-[2px] text-2xs"
                      numberOfLines={1}
                    >
                      {selectedDay}일
                    </Text>
                    <Image
                      source={{
                        uri: `${Config.IMAGE_URL}/asset/dropdownArrow.png`,
                      }}
                      className="h-[9px] w-[11px] mr-2"
                    />
                  </View>
                </ModalDropdown>
              </View>
              <View className="rounded-2xl border-solid border-[3px] border-lightsky">
                <NavigationButton
                  handleFunction={() => fetchAnalyzeChart()}
                  text="확인"
                  height="sm"
                  width="sm"
                  size="2xs"
                  color="bluesky"
                />
              </View>
            </View>
            <View className="bg-white90 rounded-2xl mx-2 pt-3 mb-2 border-solid border-[3px] border-sub03">
              <View className="py-1 mx-4 flex justify-center items-start w-fit space-y-2 rounded-lg bg-white50">
                <Text className="font-PretendardBold text-darkgray text-sm">
                  {chartData.year}년 {chartData.month}월 {chartData.week}주차
                </Text>
                <View className="flex flex-row">
                  <Text className="font-PretendardBold text-darkgray50 text-xs">
                    계좌 잔고가{" "}
                  </Text>
                  <Text className="font-PretendardBold text-black70 text-xs">
                    {chartData.data.dateSet.amount
                      .reduce((a, b) => a + b, 0)
                      .toLocaleString("ko-KR")}
                    원{" "}
                  </Text>
                  <Text className="font-PretendardBold text-darkgray50 text-xs">
                    줄어들었어요.
                  </Text>
                </View>
              </View>
              <View className="w-fill m-2 border-solid border-t-[2px] border-sub03" />
              <BarChart
                data={{
                  labels: chartData.data.labels,
                  datasets: [
                    {
                      data: chartData.data.dateSet.amount,
                      colors: chartData.data.dateSet.color?.map(ele => {
                        if (ele === true) {
                          return (opacity = 1) =>
                            `rgba(52, 184, 89, ${opacity})`;
                        }
                        return (opacity = 1) => `rgba(243, 52, 52, ${opacity})`;
                      }),
                    },
                  ],
                }}
                width={400}
                height={220}
                chartConfig={{
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  barPercentage: 0.4,
                  fillShadowGradient: "rgba(52, 184, 89, 1)",
                  fillShadowGradientFromOpacity: 1,
                  fillShadowGradientToOpacity: 1,
                  fillShadowGradientOpacity: 1,
                  fillShadowGradientTo: "rgba(52, 184, 89, 1)",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
                  strokeWidth: 40,
                  barRadius: 6,
                  propsForLabels: {
                    fontSize: 12,
                    fontFamily: "Pretendard-Bold",
                  },
                }}
                showBarTops={false}
                showValuesOnTopOfBars={true}
                fromZero
                fromNumber={0}
                withInnerLines={false}
                withHorizontalLabels={false}
                withVerticalLabels={true}
                withCustomBarColorFromData={true}
                flatColor={true}
                style={{
                  marginVertical: 10,
                  marginHorizontal: -44,
                }}
                yAxisLabel={""}
                yAxisSuffix={""}
              />
            </View>
          </View>
        </View>
        <View className="z-10 w-full h-fill bottom-0 absolute pb-4 flex justify-end items-center px-3">
          <NavigationButton
            handleFunction={() => handleFetchAnalyze()}
            text="월별 결산"
            height="lg"
            width="lg"
            size="md"
            color="bluesky"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default Analyze;
