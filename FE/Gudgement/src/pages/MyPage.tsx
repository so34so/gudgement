import {
  View,
  ImageBackground,
  Image,
  ImageSourcePropType,
} from "react-native";

import { ProgressChart } from "react-native-chart-kit";

import NavigationButton from "../components/NavigationButton";
import TagBoxLarge from "../components/TagBoxLarge";
import TagBoxSmall from "../components/TagBoxSmall";
import BasicBox from "../components/BasicBox";

import MyPageBackground from "../assets/images/mypageBackground.png";
import MypageIcon from "../assets/images/mypageIcon.png";
import AnalysisIcon from "../assets/images/analysisIcon.png";
import Character from "../assets/images/character.png";

function MyPage() {
  const mypageBackground: ImageSourcePropType =
    MyPageBackground as ImageSourcePropType;
  const mypageIcon: ImageSourcePropType = MypageIcon as ImageSourcePropType;
  const analysisIcon: ImageSourcePropType = AnalysisIcon as ImageSourcePropType;
  const character: ImageSourcePropType = Character as ImageSourcePropType;

  const data = {
    // labels: ["pedometer", "Bike", "Run"], // optional
    data: [0.6],
    // strokeWidth: 2,
    // stroleColor: "#124518",
    // borderColor: "#124518",
    // borderWidth: 2,
  };

  return (
    <View className="w-full h-full flex justify-center items-center">
      <ImageBackground
        source={mypageBackground}
        resizeMode="cover"
        className="flex w-full h-full"
      >
        <TagBoxLarge
          text01={"인동파 행동대장"}
          text02={"옥계공주"}
          img={mypageIcon}
        />
        <View className="mb-10 flex flex-row justify-center items-center">
          <View>
            <Image source={character} />
            <BasicBox text={"뚜벅뚜벅뚜벅뚜벅..."} />
          </View>
          <View>
            <ProgressChart
              data={data}
              width={200}
              height={220}
              strokeWidth={30}
              radius={59}
              chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                // fillShadowGradientFrom: "#000000",
                // fillShadowGradientFromOpacity: 1,
                // fillShadowGradientFromOffset: 1,
                decimalPlaces: 20, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(25, 25, 55, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              style={{}}
              hideLegend={true}
            />
          </View>
        </View>
        <TagBoxSmall text={"이번달 소비 추이"} img={analysisIcon} />
        <NavigationButton screenName="Pedometer" text="만보 걷기" />
        <NavigationButton screenName="Analyze" text="분석" />
        <NavigationButton screenName="SingleRecords" text="싱글플레이 상세" />
        <NavigationButton screenName="MultiRecords" text="멀티플레이 상세" />
      </ImageBackground>
    </View>
  );
}

export default MyPage;
