import { useRouter } from "next/router";
import { NextPage } from "next";
import React, { useState } from "react";

function getBaseballResult(inputValue: string) {
  let strikes = 0;
  let balls = 0;
  let outs = 0;
  const computerNumbers = decryptNumber(
    localStorage.getItem("computerNumbers")
  );

  for (let i = 0; i < inputValue.length; i++) {
    if (computerNumbers[i] === inputValue[i]) strikes++;
    else if (computerNumbers.includes(inputValue[i])) balls++;
    else outs++;
  }
  return { guessNumber: inputValue, result: `${strikes}S ${balls}B ${outs}X` };
}
function decryptNumber(encryptedString: string): string {
  const encryptedDigits = encryptedString
    .split("")
    .map((digit) => (parseInt(digit) + 8) % 10);
  const reversedString = encryptedDigits.reverse().join("");
  const decryptedNumber = reversedString;
  return decryptedNumber;
}

function AiMatch() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();
  const { level } = router.query;

  if (level !== "easy" && level !== "hard" && level !== "medium") {
    return (
      <div>
        <h1>404 - Not Found</h1>
      </div>
    );
  }

  const checkNumericAndUnique = (numbers: string) => {
    if (!/^[0-9]*$/.test(numbers)) return true;

    return new Set(numbers).size !== 4;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value;

    setIsButtonDisabled(checkNumericAndUnique(str));
    setInputValue(str);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const record = JSON.parse(localStorage.getItem("myRecord"));

    const baseballResult = getBaseballResult(inputValue);

    record.push(baseballResult);

    localStorage.setItem("myRecord", JSON.stringify(record));

    setInputValue("");
  };

  return (
    <div className="flex flex-col items-center">
      <br />
      <p style={{ fontSize: "20px" }}>{level.toLocaleUpperCase()} Mode</p>
      <br />
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
            onClick={handleClick}
            disabled={isButtonDisabled}
          >
            맞추기
          </button>
          <p>{isButtonDisabled ? "숫자를 제대로 입력해주세요" : ""}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex justify-center items-center flex-wrap">
          <div
            className="bg-yellow-500 text-white px-8 py-4 rounded m-10 "
            style={{
              width: "400px",
              height: "400px",
              minWidth: "300px",
              minHeight: "300px"
            }}
          >
            <p className="text-2xl text-gray-800">나의 야구 기록</p>
            {JSON.parse(localStorage.getItem("myRecord")).map((record, idx) => {
              return (
                <p className="text-gray-800" key={idx}>
                  내 번호: {record.guessNumber} - 결과: {record.result}
                </p>
              );
            })}
          </div>

          <div
            className="bg-yellow-500 text-white px-8 py-4 rounded m-10"
            style={{
              width: "400px",
              height: "400px",
              minWidth: "300px",
              minHeight: "300px"
            }}
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
            style={{
              width: "1000px",
              height: "400px",
              minWidth: "700px",
              minHeight: "300px"
            }}
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
