/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";
import { Button } from "../components/button";
import { Modal } from "./modal";
import QRCode from "qrcode";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  gift: any;
  onAction?: (claimedBy: string) => void;
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
  ASH_VOUCHER_2: "Tặng bạn 1 Voucher Descente trị giá 500.000 VNĐ",
};
const ProductQrModal: React.FC<Props> = ({
  visible,
  onDismiss,
  gift,
  onAction = () => {},
}) => {
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
              {!gift.link && (
                <div className=" text-[#fff] text-center text-[4.2vw] font-semibold mt-1 px-[15px]">
                  {`${giftTitle[gift.type]}`}
                </div>
              )}
            </>
          )}

          {gift && gift._id ? (
            gift.link ? (
              <div className="flex flex-col items-center px-[3vw]">
                <Button
                  title=""
                  onClick={() => {
                    window.location.href = gift.link;
                  }}
                  className="mt-2"
                  customStyle={{
                    background: `linear-gradient(135deg, rgba(216,31,39,1) -5%, rgba(68,18,26,1) 110%)`,
                    zIndex: 20,
                    padding: "10px",
                  }}
                >
                  <div>Đổi thưởng tại Momo</div>
                </Button>
                <div className="italic  text-[3.4vw]  text-center mt-2">
                  Người dùng đổi thưởng trên app Momo lấy mã để quét tại GS25 để
                  nhận bia
                </div>
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
              </div>
            ) : (
              <div className="flex flex-col w-full px-[15px] mt-4">
                {gift.qr ? (
                  <div className="flex flex-col items-center">
                    <div
                      className="p-[10px] rounded-2xl font-semibold "
                      style={{
                        backgroundColor:
                          gift.type === "VOUCHER_SHOPEE"
                            ? "transparent"
                            : "#fff",
                      }}
                    >
                      {gift.type === "VOUCHER_SHOPEE" ? (
                        <div className="flex flex-col justify-center items-center italic text-[3.4vw]">
                          Hãy nhập code HEIN1B200 vào Trang shopee để mua sản
                          phẩm được giảm giá 200,000 VND:
                          <Button
                            title=""
                            onClick={() => {
                              window.location.href =
                                "https://shopee.vn/H%E1%BB%8EA-T%E1%BB%90C-HCM-Th%C3%B9ng-24-lon-Th%E1%BB%A9c-u%E1%BB%91ng-%C4%91%E1%BA%A1i-m%E1%BA%A1ch-Heineken-0.0-330ml-lon-i.453043569.20217617444?fbclid=IwAR1_HHrvhL_YBf8yqn4NnwU7OVP4uIZ5Lcpnbt6U49IR-s9uL4460jp0UOQ";
                            }}
                            className="mt-2"
                            customStyle={{
                              background: `linear-gradient(135deg, rgba(216,31,39,1) -5%, rgba(68,18,26,1) 110%)`,
                              zIndex: 20,
                              padding: "10px",
                            }}
                          >
                            <div>Tới Shopee ngay</div>
                          </Button>
                        </div>
                      ) : (
                        <QRCodeSVG value={gift.qr.toString()} />
                      )}
                    </div>
                    {gift.type !== "VOUCHER_SHOPEE" && (
                      <div className="text-primary italic mt-2 text-center text-[3.8vw]">
                        Quét mã QR ở California Fitness để đổi quà
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="text-[#fff] text-center text-[3.5vw] mt-1 mb-2 px-[15px] italic">
                      Lựa chọn nơi đổi thưởng
                    </div>
                    <div className="flex items-center justify-center">
                      {gift.type === "BEER" && (
                        <Button
                          onClick={() => onAction("gs")}
                          title=""
                          customStyle={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 20,
                            borderWidth: 1,
                          }}
                        >
                          <img className="w-[30vw]" src="./assets/gs_25.png" />
                        </Button>
                      )}
                      <Button
                        onClick={() => onAction("cali")}
                        title=""
                        customStyle={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 20,
                          borderWidth: 1,
                        }}
                      >
                        <img className="w-[29vw]" src="./assets/caliIcon.png" />
                      </Button>
                    </div>
                  </div>
                )}

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
            )
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

export default ProductQrModal;
