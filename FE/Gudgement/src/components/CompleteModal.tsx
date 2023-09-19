import {
  View,
  Text,
  Modal,
  Alert,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import Svg, { WithLocalSvg, Text as SvgText } from "react-native-svg";
import { CommonType } from "../types/CommonType";
import CloseIcon from "../assets/icons/closeModal.svg";
function CompleteModal({
  item,
  completeModalVisible,
  setCompleteModalVisible,
}: {
  item?: CommonType.Titem | CommonType.TinvenItem;
  completeModalVisible: { buy?: boolean; complete: boolean };
  setCompleteModalVisible: React.Dispatch<
    React.SetStateAction<{ buy?: boolean; complete: boolean }>
  >;
}) {
  const closeModal: ImageSourcePropType = CloseIcon as ImageSourcePropType;
  const modalDirection = item?.image ? "mt-[43%]" : "mt-[80%]";
  const textDirection = item?.image ? "30" : "40";
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={completeModalVisible.complete}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setCompleteModalVisible({
          ...completeModalVisible,
          complete: !completeModalVisible.complete,
        });
      }}
      className="opacity-80"
    >
      <View
        className="flex flex-1 justify-start items-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          className={`${modalDirection} bg-sub01 rounded-[20px] px-10 py-8 border-2 border-white items-center shadow-lg`}
        >
          <Pressable
            className="absolute right-1 top-1"
            onPress={() => {
              setCompleteModalVisible({
                ...completeModalVisible,
                complete: !completeModalVisible.complete,
              });
            }}
          >
            <WithLocalSvg width={40} height={40} asset={closeModal} />
          </Pressable>
          <Svg height="80" width="140" className="mt-5">
            <SvgText
              fill="#ffb800"
              stroke="black"
              strokeWidth={2}
              fontSize="32"
              fontFamily="Pretendard-ExtraBold"
              x="70"
              y={textDirection}
              textAnchor="middle"
            >
              {item && "price" in item ? "구매완료" : "적용완료"}
            </SvgText>
          </Svg>
          {item && "price" in item ? (
            <>
              <Text className="text-white text-[16px] font-PretendardExtraBold">
                {item.itemContent}
              </Text>
              <Text className="text-main text-[32px] font-PretendardExtraBold">
                {item.itemName}
              </Text>
              <WithLocalSvg
                className="left-4 top-6"
                width={220}
                height={200}
                asset={item.image as ImageSourcePropType}
              />
            </>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
export default CompleteModal;
