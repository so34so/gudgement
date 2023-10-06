import { useEffect, useState } from "react";
import {
  ImageBackground,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { CommonType } from "../types/CommonType";
import Config from "react-native-config";
import Reactotron from "reactotron-react-native";
import fetchApi from "../utils/tokenUtils";
import PlayNavigator from "../navigation/PlayNavigator";
import PlaySelect from "./PlaySelect";
import PlayMatchingWait from "./PlayMatchingWait";
import PlayMatchingQueue from "./PlayMatchingQueue";
import PlayMatchingQueueWait from "./PlayMatchingQueueWait";
import PlayGameStart from "./PlayGameStart";
import PlayGameProgress from "./PlayGameProgress";
import PlayGameResult from "./PlayGameResult";
import PlayGameFinalResult from "./PlayGameFinalResult";

import { mapInfoArray } from "../components/MapData";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../utils/common";
import { useWebSocket } from "../components/WebSocketContext";

function PlayGameLogic() {
  const client = useWebSocket();
  const { data: userData, error: fetchError } = useQuery({
    queryKey: ["fetchUserInfo"],
  });

  // 게임 진행 관련 변수
  const [myCharacter, setMyCharacter] = useState(null);
  const [enemyCharacter, setEnemyCharacter] = useState(null);
  const [myInfo, setMyInfo] = useState(null);
  const [enemyInfo, setEnemyInfo] = useState(null);
  const [roomNumber, setRoomNumber] = useState(null);
  const [roundInfo, setRoundInfo] = useState(null);
  const [roundResult, setRoundResult] = useState(null);
  const [selectedTiggle, setSelectedTiggle] = useState(null);

  // 게임 컴포넌트 관련 변수
  const [nowGameComponent, setNowGameComponent] = useState("PlaySelect");
  const [subType, setSubType] = useState("");

  // 로딩 관련 변수
  const [isLoading, setIsLoading] = useState(false);

  const sendHandler = (endpoint, payload, callback) => {
    client?.send(endpoint, {}, JSON.stringify(payload), callback);
  };

  const subStomp = () => {
    switch (nowGameComponent) {
      case "PlaySelect":
        client?.subscribe("/queue/start/" + userData.nickname, message => {
          setRoomNumber(message.body.replace(/"/g, ""));
          setNowGameComponent("PlayMatchingQueue");
        });
        break;
      case "PlayMatchingWait":
        client?.subscribe("/queue/start/" + userData.nickname, message => {
          setRoomNumber(message.body.replace(/"/g, ""));
          setNowGameComponent("PlayMatchingQueue");
        });
        break;
      case "PlayMatchingQueue":
        client?.subscribe("/topic/game/match/timeout" + roomNumber, message => {
          setNowGameComponent("PlaySelect");
        });
        break;
      case "PlayMatchingQueueWait":
        client?.subscribe("/topic/game/" + roomNumber, message => {
          const userInfoDtos = JSON.parse(message.body);
          const mymy = userInfoDtos[0];
          const enemyenemy = userInfoDtos[1];
          if (
            mymy &&
            mymy.equippedItems &&
            Array.isArray(mymy.equippedItems.items)
          ) {
            const myItem = mymy.equippedItems.items.find(
              item => item.type === "character",
            );
            if (myItem) {
              setMyCharacter(myItem.image);
            }
          }

          if (
            enemyenemy &&
            enemyenemy.equippedItems &&
            Array.isArray(enemyenemy.equippedItems.items)
          ) {
            const enemyItem = enemyenemy.equippedItems.items.find(
              item => item.type === "character",
            );

            if (enemyItem) {
              setEnemyCharacter(enemyItem.image);
            }
          }

          setMyInfo(mymy);
          setEnemyInfo(enemyenemy);
          if (myInfo && enemyInfo) {
            setNowGameComponent("PlayGameStart");
          }
        });
        client?.subscribe("/topic/game/match/timeout" + roomNumber, message => {
          console.log("Room number: " + message.body);
          Reactotron.log!("Room number: " + message.body);
          setNowGameComponent("PlaySelect");
        });

        break;
      //   case "PlayGameProgress":
      //     const timeoutSubscription = client?.subscribe(
      //       "/topic/game/round/timeout" + roomNumber,
      //       function (messageOutput) {},
      //     );

      //     client?.subscribe(
      //       "/topic/game/" + roomNumber + userData.nickname,
      //       function (messageOutput) {
      //         timeoutSubscription.unsubscribe();
      //         console.log("round", messageOutput.body);
      //       },
      //     );
    }
  };
  useEffect(() => {
    if (myInfo && enemyInfo) {
      setNowGameComponent("PlayGameStart");
    }
  }, [myInfo, enemyInfo]);

  useEffect(() => {
    subStomp();
  }, [nowGameComponent]);

  if (isLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  switch (nowGameComponent) {
    case "PlayGameResult":
      return (
        <PlayGameResult
          roomNumber={roomNumber}
          rounds={roundResult.rounds}
          result={roundResult.result}
          cardInfo={roundResult.cardInfo}
          nickName={userData.nickname}
          myCharacter={myCharacter}
          setMyCharacter={setMyCharacter}
          enemyCharacter={enemyCharacter}
          setEnemyCharacter={setEnemyCharacter}
          setNowGameComponent={setNowGameComponent}
        />
      );
    case "PlaySelect":
      return (
        <PlaySelect
          userData={userData}
          setNowGameComponent={setNowGameComponent}
          sendHandler={sendHandler}
          setSelectedTiggle={setSelectedTiggle}
        />
      );

    case "PlayMatchingWait":
      return (
        <PlayMatchingWait
          userData={userData}
          selectedTiggle={selectedTiggle}
          sendHandler={sendHandler}
        />
      );
    case "PlayMatchingQueue":
      return (
        <PlayMatchingQueue
          userData={userData}
          roomNumber={roomNumber}
          sendHandler={sendHandler}
          setNowGameComponent={setNowGameComponent}
        />
      );
    case "PlayMatchingQueueWait":
      return <PlayMatchingQueueWait />;
    case "PlayGameStart":
      return (
        <PlayGameStart
          myInfo={myInfo}
          setMyInfo={setMyInfo}
          enemyInfo={enemyInfo}
          setEnemyInfo={setEnemyInfo}
          myCharacter={myCharacter}
          setMyCharacter={setMyCharacter}
          enemyCharacter={enemyCharacter}
          setEnemyCharacter={setEnemyCharacter}
          setNowGameComponent={setNowGameComponent}
        />
      );
    case "PlayGameProgress":
      return (
        <PlayGameProgress
          roomNumber={roomNumber}
          userData={userData}
          roundInfo={roundInfo}
          setRoundInfo={setRoundInfo}
          myInfo={myInfo}
          setMyInfo={setMyInfo}
          enemyInfo={enemyInfo}
          setEnemyInfo={setEnemyInfo}
          myCharacter={myCharacter}
          setMyCharacter={setMyCharacter}
          enemyCharacter={enemyCharacter}
          setEnemyCharacter={setEnemyCharacter}
          sendHandler={sendHandler}
          setNowGameComponent={setNowGameComponent}
          setRoundResult={setRoundResult}
          roundResult={roundResult}
        />
      );

    case "PlayGameFinalResult":
      return (
        <PlayGameFinalResult
          roomNumber={roomNumber}
          rounds={roundResult.rounds}
          result={roundResult.result}
          cardInfo={roundResult.cardInfo}
          nickName={userData.nickname}
          myCharacter={myCharacter}
          sendHandler={sendHandler}
          setNowGameComponent={setNowGameComponent}
        />
      );
    default:
      break;
  }
}

export default PlayGameLogic;
