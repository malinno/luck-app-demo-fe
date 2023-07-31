// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "./components/button";
// eslint-disable-next-line no-unused-vars
import { Select } from "./components/select";

const MainPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = () => {
    // Kiểm tra xem age có phải là một số nguyên hợp lệ không
    if (!Number.isInteger(parseInt(age))) {
      console.error("Invalid age");
      return;
    }

    const newUser = {
      username: username,
      phonenumber: phonenumber,
      age: age,
    };

    // Gửi thông tin người dùng mới đến backend để kiểm tra và chuyển hướng
    axios
      .post("http://localhost:3000/api/check-user", newUser)
      .then((response) => {
        // Kiểm tra thông tin thành công, chuyển hướng đến trang SpinCountPage
        const redirectTo = response.data.redirectTo;
        history.push(redirectTo);
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi khi gửi thông tin không thành công
      });
  };
  // const handleSubmit = () => {
  //   const newUser = {
  //     username: username,
  //     phonenumber: phonenumber,
  //   };

  //   // Gửi thông tin người dùng mới đến backend để kiểm tra và chuyển hướng
  //   axios
  //     .post("http://localhost:3000/api/check-user", newUser)
  //     .then((response) => {
  //       // Kiểm tra thông tin thành công, chuyển hướng đến trang SpinCountPage
  //       const redirectTo = response.data.redirectTo;
  //       history.push(redirectTo);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // Xử lý lỗi khi gửi thông tin không thành công
  //     });
  // };

  return (
    <div className="flex flex-1 h-screen flex-col w-full bg-gradient-to-b from-[rgb(2,57,139)] to-[#86E9FF] h-full px-[20px] pt-[20px]">
      <div
        className="justify-center text-center mt-4 text-2xl font-bold"
        style={{ color: "#fff" }}
      >
        VÒNG QUAY MAY MẮN
      </div>
      <div className="text-[#fff] text-center text-[3.2vw] mt-10">
        Chúng tôi cần một số thông tin của các bạn để tham gia chương trình quay
        số may mắn cuả chúng tôi
      </div>
      <div className="mt-20 font-bold text-[3.8vw] ">
        Nhập họ và tên của bạn
      </div>
      <input
        className="text-[3.8vw] bg-[#01437D] rounded-lg p-[10px] mt-3 drop-shadow-lg text-[#fff]"
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="mt-4 font-bold text-[3.8vw]">
        Nhập số điện thoại của bạn
      </div>
      <input
        className="text-[3.8vw] bg-[#01437D] rounded-lg p-[10px] mt-3 drop-shadow-lg text-[#fff]"
        type="text"
        id="phonenumber"
        value={phonenumber}
        onChange={(e) => setPhonenumber(e.target.value)}
      />
      <div className="mt-4 font-bold text-[3.8vw]">Nhập số tuổi của bạn</div>
      <input
        className="text-[3.8vw] bg-[#01437D] rounded-lg p-[10px] mt-3 drop-shadow-lg text-[#fff]"
        type="number"
        id="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <div className="mt-4 font-bold text-[3.8vw]">
        Tỉnh thành/ Thành phố bạn đang sống
      </div>
      <div className="w-full bg-[#01437D] rounded-lg  mt-3 ">
        <input
          // options={city}
          className="text-[3.8vw] bg-[#01437D] w-full rounded-lg py-[10px] px-[5vw]drop-shadow-lg text-[#fff]"
        />
      </div>
      <div className="mt-4 flex-row font-bold text-[3.8vw]">
        <div className="text-primary text-[3.8vw] flex justify-between">
          <div>Giới tính</div>
          <div className="flex">
            <div className=" mr-[5vw]">
              <input
                type="radio"
                value="male"
                name="gender"
                className="mr-[1vw]"
              />
              Nam
            </div>
            <div>
              <input
                type="radio"
                value="female"
                name="gender"
                className="mr-[1vw]"
              />
              Nữ
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5">
        <Button title="" type="submit" onClick={handleSubmit}>
          <div className="text-[#fff] text-[4vw] font-semibold bg-gradient-to-b from-[#D81F27] to-[#75121A] p-[1.5vw] px-[3vw] rounded-3xl">
            Tham gia vòng quay
          </div>
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
