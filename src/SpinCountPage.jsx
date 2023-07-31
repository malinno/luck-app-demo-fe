// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "./components/button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { createGame } from "./Lucky";
import { eventEmitter } from "./eventEmitter";
import "./App.css";
const Quay = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const gamePromise = createGame(ref.current);
      return () => {
        gamePromise.then((dispose) => dispose());
      };
    }
  }, [ref]);

  return (
    <canvas
      style={{
        width: window.innerWidth * 1.2,
        height: window.innerWidth * 1.2,
        maxWidth: window.innerHeight * 0.6,
        maxHeight: window.innerHeight * 0.6,
        zIndex: 0,
      }}
      ref={ref}
    ></canvas>
  );
};

const SpinCountPage = () => {
  const [spinning, setSpinning] = useState(false);
  const location = useLocation();
  const [spinCount, setSpinCount] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();

  const handleBackClick = () => {
    window.history.back();
  };
  const handleSpinDone = () => {
    setSpinning(false);
    setModalVisible(true);
  };

  useEffect(() => {
    // Lấy thông tin người dùng từ URL query params
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get("username");
    const phonenumber = searchParams.get("phonenumber");
    const age = searchParams.get("age");

    // Gọi API "lấy spin count" dựa trên thông tin người dùng
    axios
      .get(
        `http://localhost:3000/api/users/spincount?username=${username}&phonenumber=${phonenumber}&age=${age}`
      )
      .then((response) => {
        setSpinCount(response.data.spincount);
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi khi không lấy được spin count
      });
  }, [location]);

  // Hàm xử lý sự kiện khi nhấn nút Quay
  const handleSpin = () => {
    if (spinCount > 0 && !spinning) {
      setSpinning(true);
      eventEmitter.emit("startSpin");
      eventEmitter.emit("spinTo", 7);
      // Gọi API cập nhật spin count trừ đi 1
      axios
        .put("http://localhost:3000/api/users/spin", {
          username: "Nguyễn Văn Đạt", // Thay bằng thông tin người dùng thích hợp
          phonenumber: "0337185649", // Thay bằng thông tin người dùng thích hợp
          age: 23, // Thay bằng thông tin người dùng thích hợp
          spincount: spinCount - 1,
        })
        .then((response) => {
          setSpinCount(response.data.spincount);
        })
        .catch((error) => {
          console.error(error);
          // Xử lý lỗi khi không cập nhật được spin count
        });
    }
  };
  useEffect(() => {
    const handler = () => {
      setSpinning(false);
      handleSpinDone();
      // setModalVisible(true);
    };
    eventEmitter.on("spinDone", handler);
    return () => {
      eventEmitter.off("spinDone", handler);
    };
  }, []);

  return (
    <div className="flex flex-1 h-screen flex-col w-full bg-gradient-to-b from-[rgb(2,57,139)] to-[#86E9FF] h-full px-[20px] pt-[20px]">
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
          VÒNG QUAY MAY MẮN{" "}
        </h1>
      </div>

      {/* vòng quay ở đây */}
      <div
        className="w-full aspect-css z-0 flex items-center justify-center"
        style={{
          width: "200px",
          marginLeft: "70px",
        }}
      >
        <Quay />
      </div>

      {/* hết vòng quay */}
      <div className=" w-full justify-center items-center flex mt-5 z-10">
        <Button
          title=""
          onClick={handleSpin}
          customStyle={{
            background: `linear-gradient(135deg, rgba(216,31,39,1) -5%, rgba(68,18,26,1) 110%)`,
            zIndex: 20,
            padding: "10px 0",
            width: "40%",
            display: "flex",
            justifyContent: "center",
            borderRadius: 25,
          }}
        >
          <div className=" text-center text-[4.5vw]">QUAY NGAY</div>
        </Button>
      </div>
      <div className="mt-3 mx-[30vw] text-[#fff] text-sm">
        {/* Số lượt quay:{" "} */}
        {spinCount !== null ? (
          <p>Số lượt quay : {spinCount}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="flex flex-row mt-auto mb-[20px] px-[20px] justify-between w-full">
        <div className="flex items-center flex-col">
          <Button
            title=""
            onClick={() => history.push("/gitfts")}
            customStyle={{
              zIndex: 20,
              display: "flex",
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: "transparent",
            }}
          >
            <img
              src="../assets/qua.png"
              style={{ width: "18vw", aspectRatio: 1, maxWidth: 80 }}
            />
          </Button>
          <div className="text-[#002E6D] mt-[2vw] text-[4.5vw]">
            Danh sách quà
          </div>
        </div>

        <div className="flex items-center flex-col">
          <Button
            title=""
            // onClick={() => navigate("/gioqua")}
            onClick={() => history.push("/giftbaskets")}
            customStyle={{
              zIndex: 20,
              display: "flex",
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: "transparent",
            }}
          >
            <img
              src="../assets/danhsach.png"
              style={{ width: "18vw", aspectRatio: 1, maxWidth: 80 }}
            />
          </Button>
          <div className="text-[#002E6D] mt-[2vw] text-[4.5vw]">
            Giỏ quà của bạn
          </div>
        </div>
      </div>
      {modalVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <img
              src="../public/assets/gift-modal-banner.png"
              alt="Italian Trulli"
              className="img"
            />
            <div className="image-container">
              <img src="../public/assets/circle.png" alt="Italian Trulli" />

              <div className="text-container">
                {/* <img
                  src="../public/assets/bia.png"
                  className="h-[30vw] mx-[15vw] my-5"
                /> */}
                <h2
                  className="text-2xl "
                  style={{ color: "#fff", whiteSpace: "pre", lineHeight: 1.2 }}
                >
                  THẦN MAY MẮN GÕ CỬA !
                </h2>
                <p
                  className="text-sm mt-2 font-light"
                  style={{ color: "#fff", whiteSpace: "pre", lineHeight: 1.2 }}
                >
                  Tặng bạn 1 lon Heineken 0.0 mát lạnh nè
                </p>
                <p
                  className="text-xm mt-3 font-light"
                  style={{ color: "#fff", whiteSpace: "pre", lineHeight: 1.2 }}
                >
                  Lựa chọn nơi đổi thưởng
                </p>
                <div className="flex w-20 text-center justify-center mx-[27vw] mt-9 ">
                  <img
                    src="../public/assets/gs_25.png"
                    alt="Italian Trulli"
                    className="w-72 "
                  />
                  <img
                    src="../public/assets/gs_25.png"
                    alt="Italian Trulli"
                    className="w-72 "
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={() => setModalVisible(false)}
              customStyle={{
                marginTop: "12px",
                marginLeft: "52px",
                background: `linear-gradient(135deg, rgba(216,31,39,1) -5%, rgba(68,18,26,1) 110%)`,
                zIndex: 20,
                padding: "10px 0",
                width: "73%",
                display: "flex",
                justifyContent: "center",
                borderRadius: 25,
              }}
            >
              Quay Lại
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinCountPage;
