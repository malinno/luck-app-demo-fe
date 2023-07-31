// eslint-disable-next-line no-unused-vars
import React, { useMemo } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button } from "./components/button";

export default function GiftBaskets() {
  const giftNames = {
    BEER: "Thức uống ",
    MACBOOK: "Macbook",
  };

  const giftDes = {
    BEER: "Heineken 0.0",
    MACBOOK: "Heineken 0.0",
  };
  const gifts = useMemo(() => {
    return Object.keys(giftNames);
  }, []);
  const handleBackClick = () => {
    window.history.back();
  };
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
          className="text-xl text-center mt-5 font-extrabold justify-center "
          style={{ color: "#fff", marginLeft: "79px" }}
        >
          GIỎ QUÀ
        </h1>
      </div>
      <h1 className="text-center text-2xs mt-1 " style={{ color: "#fff" }}>
        1 TỶ BƯỚC, VƯỢT KỲ TÍCH
      </h1>
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
            <Button
              customStyle={{
                marginTop: "6px",
                marginLeft: "99px",
                background: `linear-gradient(135deg, rgba(216,31,39,1) -5%, rgba(68,18,26,1) 110%)`,
                zIndex: 20,
                padding: "10px 0",
                width: "30%",
                display: "flex",
                justifyContent: "center",
                borderRadius: 25,
              }}
            >
              Chi Tiết
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
