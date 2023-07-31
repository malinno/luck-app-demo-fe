import * as React from "react";
import { Button } from "../components/button";
import { Modal } from "./modal";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  gift: any;
  onAction?: () => void;
};

const giftTitle: any = {
  BEER: "Tặng bạn 1 thức uống đại mạch Heineken 0.0 mát lạnh nè",
  VOUCHER_SHOPEE: "Tặng bạn 1 Voucher Shopee trị giá 200.000VNĐ",
  GOLD_MEMBERSHIP:
    "Tặng bạn 1 thẻ GOLD MEMBERSHIP 3 tháng của California Fitness & Yoga để giữ dáng nhé!",
  AO_THUN: "Áo thun từ Heineken 0.0",
  TOTE_BAG: "Tặng bạn 1 Túi tote Heineken 0.0",
  SO_TAY: "Tặng bạn 1 Sổ tay Heineken 0.0",
  ASH_VOUCHER:
    "Tặng bạn 1 Voucher On trị giá 500.000 VNĐ khi mua giày tại Ash.vn",
  ASH_VOUCHER_2:
    "Tặng bạn 1 Voucher Descente trị giá 500.000 VNĐ, áp dụng cho hoá đơn từ 3.000.000 VNĐ tại Descente.vn hoặc ASH",
};

const GiftModal: React.FC<Props> = ({ visible, onDismiss, gift, onAction }) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <div className="flex flex-row justify-center absolute bottom-[-50px]">
        <Button title="" onClick={onDismiss}>
          <img
            style={{
              width: 32,
              aspectRatio: 1,
            }}
            src="../assets/back-btn.png"
          />
        </Button>
      </div>
      <div className="relative w-[100vw] flex justify-center items-center">
        <div
          style={{
            background: `linear-gradient(175.85deg, #16447E 1.64%, #439BD9 97.17%)`,
            borderRadius: 20,
            width: window.innerWidth * 0.9,
          }}
        >
          <div className="flex items-center justify-center relative flex-col pt-[25vw] px-[20px]">
            <img
              src="../assets/circle.png"
              style={{ width: "95%", aspectRatio: 1, marginTop: -20 }}
            />
            <div className="absolute flex-col top-0 right-0 bottom-0 left-0 flex items-center justify-center ">
              {gift.type ? (
                <img
                  src={`../assets/${gift.type}.png`}
                  style={{
                    width: "50%",
                    aspectRatio: 1,
                    marginTop: window.innerWidth * 0.12,
                  }}
                />
              ) : (
                <div
                  className={`text-[#fff] font-bold text-[5.5vw] uppercase items-center justify-center flex text-center px-[20px] mt-[${
                    window.innerWidth * 0.12
                  }]`}
                >
                  Chúc bạn <br />
                  may mắn lần sau
                </div>
              )}
            </div>
          </div>

          {gift && gift._id && (
            <>
              <div
                className="text-[#fff] font-extrabold text-[5.5vw] uppercase items-center justify-center flex text-center"
                style={{ marginTop: -window.innerWidth * 0.1 }}
              >
                THẦN MAY MẮN GÕ CỬA
              </div>
              <div className=" text-[#fff] text-center text-[3.8vw] mt-1 px-[15px]">
                {`${giftTitle[gift.type]}`}
              </div>
            </>
          )}

          {gift && gift._id ? (
            <div className="flex flex-col w-full px-[15px] mt-4">
              <Button
                onClick={onAction}
                title=""
                customStyle={{
                  backgroundColor: "#051832",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 0",
                  borderRadius: 20,
                  borderWidth: 1,
                }}
              >
                <div className="text-center text-[4.5vw]">
                  Chi tiết quà tặng
                </div>
              </Button>

              <Button
                onClick={onDismiss}
                title=""
                customStyle={{
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 0",
                  borderRadius: 20,
                  border: "1px solid #fff",
                  marginTop: 15,
                  marginBottom: 20,
                }}
              >
                <div className="text-center text-[4.5vw]">Quay lại</div>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col w-full px-[15px] mt-4 mb-4">
              <Button
                onClick={onDismiss}
                title=""
                customStyle={{
                  backgroundColor: "#051832",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 0",
                  borderRadius: 20,
                  borderWidth: 1,
                }}
              >
                <div className="text-center text-[4.5vw]">Quay lại</div>
              </Button>
            </div>
          )}
        </div>
        <img
          src="../assets/gift-modal-banner.png"
          style={{
            width: "100vw",
            position: "absolute",
            aspectRatio: 643 / 302,
            top: -window.innerWidth / 6,
          }}
        />
      </div>
    </Modal>
  );
};

export default GiftModal;
