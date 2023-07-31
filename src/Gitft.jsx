// eslint-disable-next-line no-unused-vars
import React, { useMemo } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const giftNames = {
  BEER: "Thức uống đại mạch",
  VOUCHER_SHOPEE: "Voucher Shopee",
  GOLD_MEMBERSHIP: "Thẻ GOLD MEMBERSHIP",
  AO_THUN: "Áo thun",
  TOTE_BAG: "Túi Tote",
  ASH_VOUCHER_2: "Voucher Descente",
  SO_TAY: "Sổ tay",
  MACBOOK: "Macbook",
};

const giftDes = {
  BEER: "Heineken 0.0",
  GOLD_MEMBERSHIP: "3 tháng của California Fitness & Yoga",
  AO_THUN: "Heineken 0.0",
  TOTE_BAG: "Heineken 0.0",
  VOUCHER_SHOPEE: "Trị giá 200.000 VNĐ khi mua hàng tại Shopee",
  ASH_VOUCHER_2:
    "Trị giá 500.000 VNĐ, áp dụng cho hoá đơn từ 3.000.000 VNĐ tại Descente.vn hoặc ASH",
  SO_TAY: "Heineken 0.0",
  MACBOOK: "Heineken 0.0",
};

const GiftList = () => {
  const handleBackClick = () => {
    // Use window.history to navigate back to the previous page
    window.history.back();
  };
  const gifts = useMemo(() => {
    return Object.keys(giftNames);
  }, []);

  return (
    <div className="bg-gradient-to-b h-screen from-[rgb(2,57,139)] to-[#86E9FF] px-[10px]  h-full w-full overflow-y-auto">
      <div className="flex">
        <h1
          className="mx-5 mt-6 text-xl"
          style={{ color: "#FFF" }}
          onClick={handleBackClick}
        >
          <AiOutlineArrowLeft />
        </h1>
        <h1
          className="text-xl text-center mt-5 font-extrabold"
          style={{ color: "#fff" }}
        >
          DANH SÁCH QUÀ
        </h1>
      </div>
      <div className="flex h-fit w-full flex-col pt-[20px] rounded-2xl overflow-y-auto">
        {gifts.map((gift) => (
          <div
            key={gift}
            className="bg-[#002E6D] flex flex-1 flex-row p-2 px-[10px] rounded-2xl  items-center mt-[10px]"
          >
            <img
              src={`./assets/${gift}.png`}
              style={{
                height: "15vw",
                aspectRatio: 282 / 258,
                marginRight: 10,
              }}
              alt={giftNames[gift]}
            />
            <div>
              <div className="text-[#fff] text-[3.8vw]">{giftNames[gift]}</div>
              <div className="text-[#fff] text-[3vw]">{giftDes[gift]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftList;
