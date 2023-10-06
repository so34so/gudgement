import { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { useQuery } from "@tanstack/react-query";
import Config from "react-native-config";

import BasicBox from "../components/BasicBox";
import CustomModal from "../components/CustomModal";
import NavigationButton from "../components/NavigationButton";
import TagBoxSmall from "../components/TagBoxSmall";

import reactotron from "reactotron-react-native";

import { CommonType } from "../types/CommonType";
import { textShadow } from "../utils/common";
import {
  initialize,
  requestPermission,
  readRecords,
  insertRecords,
} from "react-native-health-connect";
import { TimeRangeFilter } from "react-native-health-connect/lib/typescript/types/base.types";
import fetchApi from "../utils/tokenUtils";

function Pedometer(this: unknown) {
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
    enabled: false,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [steps, setSteps] = useState(0);
  const [stepPercentage, setStepPercentage] = useState(0);
  async function getHealthData() {
    await initialize();
    // request permissions
    await requestPermission([{ accessType: "read", recordType: "Steps" }]);
    await requestPermission([{ accessType: "write", recordType: "Steps" }]);
    const insertSampleData = () => {
      const today = new Date();
      insertRecords([
        {
          recordType: "Steps",
          count: 11000,
          startTime: new Date(today.getTime() - 86400000).toISOString(),
          endTime: today.toISOString(),
        },
      ]).then(ids => {
        console.log("Records inserted ", { ids }); // Records inserted  {"ids": ["06bef46e-9383-4cc1-94b6-07a5045b764a", "a7bdea65-86ce-4eb2-a9ef-a87e6a7d9df2"]}
      });
    };
    insertSampleData();
    const getData = async () => {
      const today = new Date();
      const timeRangeFilter: TimeRangeFilter = {
        operator: "between",
        startTime: new Date(today.getTime() - 86400000).toISOString(),
        endTime: today.toISOString(),
      };
      // Steps
      const fetchSteps = await readRecords("Steps", { timeRangeFilter });
      const totalSteps = fetchSteps.reduce((sum, cur) => sum + cur.count, 0);
      setSteps(totalSteps);
      setStepPercentage(totalSteps / 10000 >= 1 ? 1 : totalSteps / 10000);
    };

    getData();
  }
  useEffect(() => {
    refetch();
    getHealthData();
  }, [refetch]);

  if (isLoading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFetchMillion = async () => {
    if (steps < 10000) {
      setModalText("만보를 덜 채웠군요!!");
      openModal();
      return;
    }
    try {
      await fetchApi.post(`${Config.API_URL}/member/pedometer`, null, {
        params: {
          memberId: userData?.memberId,
        },
      });
      setModalText("만보 보상 받기 완료!");
      openModal();
    } catch (error) {
      reactotron.log!(error);
    }
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
            text={"만보 걷기 챌린지"}
            img={`${Config.IMAGE_URL}/asset/pedometerIcon.png`}
          />
        </View>
        <View className="mb-10 flex flex-row justify-center items-center w-fill h-fill m-6 rounded-3xl bg-lightsky60 border-solid border-[2px] border-darkgray">
          <View className="ml-8 mt-4">
            <Image
              source={{
                uri: `${Config.IMAGE_URL}/asset/dogezaPenguin.png`,
              }}
              className="w-fill h-[100px] mb-4"
            />
            <BasicBox text={"뚜벅뚜벅뚜벅뚜벅..."} />
          </View>
          <View className="flex justify-center items-center mt-6 mr-2">
            <View className="flex justify-center items-center">
              <ProgressChart
                data={{
                  data: [stepPercentage],
                  colors: ["#3190FF"],
                }}
                width={200}
                height={200}
                strokeWidth={30}
                radius={59}
                chartConfig={{
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                withCustomBarColorFromData={true}
                style={{ zIndex: 2 }}
                hideLegend={true}
              />
              <ProgressChart
                data={{
                  data: [stepPercentage],
                  colors: ["#000000b2"],
                }}
                width={200}
                height={200}
                strokeWidth={38}
                radius={59}
                chartConfig={{
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                withCustomBarColorFromData={true}
                style={{ position: "absolute", zIndex: 1 }}
                hideLegend={true}
              />
            </View>
            <View className="flex flex-col bg-darkgray50 h-20 w-20 justify-center items-center absolute z-0 rounded-full">
              <Text
                style={textShadow}
                className="text-center text-white text-md font-PretendardExtraBold"
                numberOfLines={1}
              >
                {steps}
              </Text>
              <Text
                style={textShadow}
                className="text-center text-white text-xs font-PretendardBold"
                numberOfLines={1}
              >
                걸음
              </Text>
            </View>
          </View>
        </View>
        <View className="z-10 w-full h-fill bottom-0 absolute pb-4 flex justify-end items-center">
          <NavigationButton
            handleFunction={() => handleFetchMillion()}
            text="보상 받기"
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

export default Pedometer;
