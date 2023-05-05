import React, { useState } from "react";

function AiMatch() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const checkNumericAndUnique = (numbers: string[]) => {
    if (!/^[0-9]*$/.test(numbers.join(""))) return true;

    return new Set(numbers).size !== 4;
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 이 부분에서 상대방이 생각한 숫자와 비교하여 결과를 계산합니다.
    // 계산된 결과는 setResult를 통해 저장합니다.
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div className="flex">
          <input
            type="text"
            className="border rounded-md py-2 px-3 outline-none text-center mr-1"
            maxLength={4}
            minLength={0}
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2`}
            onClick={handleSubmit}
          >
            맞추기
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex justify-center items-center flex-wrap">
          <div
            className="bg-yellow-500 text-white px-8 py-4 rounded m-10"
            style={{ width: "400px", height: "400px" }}
          >
            나의 야구 기록
            <p>1 기록</p>
            <p>2 기록</p>
            <p>3 기록</p>
          </div>

          <div
            className="bg-yellow-500 text-white px-8 py-4 rounded m-10"
            style={{ width: "400px", height: "400px" }}
          >
            컴퓨터 야구 기록
            <p>1 기록</p>
            <p>2 기록</p>
            <p>3 기록</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {/* 채팅창 추가하기 */}
          <div
            className="bg-yellow-500 text-white px-8 py-4 rounded m-10"
            style={{ width: "1000px", height: "400px" }}
          >
            채팅창
            <p>1 기록</p>
            <p>2 기록</p>
            <p>3 기록</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiMatch;
