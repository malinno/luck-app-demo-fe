import { Modal } from "./modal";

const LoadingModal = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => any;
}) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <img
        className="w-[20vw] aspect-square"
        src="./assets/loading.gif"
        alt=""
      />
    </Modal>
  );
};

export default LoadingModal;
