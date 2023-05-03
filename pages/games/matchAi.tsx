import React, { useState } from "react";

const BaseballGame = () => {
  const [inputValue, setInputValue] = useState(""); // 사용자 입력값
  const [answer, setAnswer] = useState(generateRandomNumbers()); // 정답
  const [result, setResult] = useState(""); // 결과 메시지

  // 정답 생성 함수
  function generateRandomNumbers() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let result = "";

    // 랜덤으로 4개의 숫자를 뽑아서 문자열로 반환
    for (let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random() * (9 - i));
      result += numbers[index];
      numbers.splice(index, 1);
    }

    return result;
  }

  // 입력값 체크 함수
  function checkInputValue(input) {
    const regex = /^[1-9]{1}[0-9]{3}$/; // 4자리 수, 첫번째 숫자는 1~9

    if (regex.test(input)) {
      return true;
    } else {
      alert("잘못된 입력입니다. 다시 입력해주세요.");
      setInputValue("");
      return false;
    }
  }

  // 게임 시작 함수
  function startGame() {
    if (!checkInputValue(inputValue)) {
      return;
    }

    let strike = 0;
    let ball = 0;

    for (let i = 0; i < 4; i++) {
      if (inputValue[i] === answer[i]) {
        strike++;
      } else if (answer.includes(inputValue[i])) {
        ball++;
      }
    }

    if (strike === 4) {
      setResult("정답입니다!");
    } else if (strike === 0 && ball === 0) {
      setResult("아웃입니다!");
    } else {
      setResult(`${strike} 스트라이크 ${ball} 볼 입니다.`);
    }
    setInputValue("");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center font-bold text-3xl mb-4">숫자 야구 게임</h1>

      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center">
          <div className="flex">
            <input
              type="text"
              className="border rounded-md py-2 px-3 outline-none text-center mr-1"
              maxLength={4}
              minLength={4}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            onClick={() => setAnswer(generateRandomNumbers())}
          >
            새로운 문제
          </button>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={startGame}
        >
          확인
        </button>
      </div>

      {result !== "" && (
        <div className="text-center text-xl font-bold">{result}</div>
      )}
    </div>
  );
};

export default BaseballGame;
