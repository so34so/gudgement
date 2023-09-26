import {
  View,
  Modal,
  Pressable,
  ImageSourcePropType,
  Text,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import CloseIcon from "../assets/icons/closeModal.svg";

function CustomModal({
  alertText,
  visible,
  closeModal,
}: {
  alertText: string;
  visible: boolean;
  closeModal: () => void;
}) {
  const closeIcon: ImageSourcePropType = CloseIcon as ImageSourcePropType;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        closeModal();
      }}
      className="opacity-80"
    >
      <View
        className="flex flex-1 justify-center items-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          className={
            "bg-sub01 rounded-[20px] px-10 py-8 border-2 border-white items-center shadow-lg"
          }
        >
          <Pressable
            className="absolute right-1 top-1"
            onPress={() => {
              closeModal();
            }}
          >
            <WithLocalSvg width={40} height={40} asset={closeIcon} />
          </Pressable>
          <Text className="text-white text-xs font-PretendardExtraBold p-4 w-[240px]">
            {alertText}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
export default CustomModal;
