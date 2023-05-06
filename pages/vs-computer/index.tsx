import Link from "next/link";
import { useState } from "react";

function generateRandomNumbers(numDigits: number): string[] {
  const numbers = new Set<string>();
  while (numbers.size < numDigits) {
    const randomNumber = Math.floor(Math.random() * 10);
    numbers.add(String(randomNumber));
  }
  return Array.from(numbers);
}
function encryptNumber(numbers: string): string {
  const reversedString = numbers.split("").reverse().join("");
  const encryptedDigits = reversedString
    .split("")
    .map((digit) => (parseInt(digit) + 2) % 10);
  const encryptedString = encryptedDigits.join("");
  return encryptedString;
}

export default function NumberBaseballGame() {
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFirstTurn, setIsFirstTurn] = useState(true);
  const [levelName, setLevelName] = useState("easy");

  const handleLevelClick = (level: string) => {
    setLevelName(level);
    localStorage.setItem("level", level);
  };
  const handleFirstClick = () => {
    setIsFirstTurn(true);
  };

  const handleSecondClick = () => {
    setIsFirstTurn(false);
  };

  const startGameBtn = () => {
    const computerNumbers = generateRandomNumbers(4);
    console.log(computerNumbers, "컴퓨터 랜덤생성번호");
    const encNumbers = encryptNumber(computerNumbers.join(""));
    localStorage.setItem("computerNumbers", encNumbers);
    localStorage.setItem("myRecord", JSON.stringify([]));

    alert("start !!!");
  };

  const setRandomNumbers = () => {
    const numbers = generateRandomNumbers(4);
    console.log(numbers.join(""));
    setInputValue(numbers.join(""));
    setIsButtonDisabled(false);
  };
  const checkNumericAndUnique = (numbers: string) => {
    if (!/^[0-9]*$/.test(numbers)) return true;

    return new Set(numbers).size !== 4;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value;

    setIsButtonDisabled(checkNumericAndUnique(str));
    setInputValue(str);
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
            onInput={handleInputChange}
            value={inputValue}
          />
        </div>
        <button
          className={`px-4 py-2 bg-yellow-500 text-white rounded hover:bg-blue-600 mr-2`}
          onClick={setRandomNumbers}
        >
          랜덤 숫자 생성하기
        </button>
      </div>
      {isButtonDisabled ? (
        <p className="text-red-500">
          중복되지 않은 숫자들만 입력이 가능합니다.
        </p>
      ) : (
        <p></p>
      )}
      <div className="border-dashed border-4 border-black-600 m-5">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isFirstTurn ? "bg-red-500" : ""
          }`}
          style={{ width: "150px", height: "50px", margin: "25px" }}
          onClick={handleFirstClick}
        >
          선공
        </button>

        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            !isFirstTurn ? "bg-red-500" : ""
          }`}
          style={{ width: "150px", height: "50px", margin: "25px" }}
          onClick={handleSecondClick}
        >
          후공
        </button>

        {/* ... */}
      </div>
      <div className="border-dashed border-4 border-black-600 m-5">
        <div className="h-96 flex justify-center items-center">
          <div className="">
            <button
              id="easy"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                levelName === "easy" ? "bg-red-500" : ""
              }`}
              style={{ width: "150px", height: "50px", margin: "0 25px" }}
              onClick={() => handleLevelClick("easy")}
            >
              쉬움
            </button>
            <button
              id="medium"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                levelName === "medium" ? "bg-red-500" : ""
              }`}
              style={{ width: "150px", height: "50px", margin: "0 25px" }}
              onClick={() => handleLevelClick("medium")}
            >
              중간
            </button>
            <button
              id="hard"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                levelName === "hard" ? "bg-red-500" : ""
              }`}
              style={{ width: "150px", height: "50px", margin: "0 25px" }}
              onClick={() => handleLevelClick("hard")}
            >
              어려움
            </button>
          </div>
        </div>
      </div>

      <div>
        <Link href={`vs-computer/${levelName}`}>
          <button
            className={`px-4 py-2 bg-yellow-500 text-white rounded hover:bg-blue-600 mr-2`}
            onClick={startGameBtn}
            disabled={isButtonDisabled}
          >
            게임 시작
          </button>
        </Link>
        <p> {isButtonDisabled ? "입력되지 않은 정보들이 있습니다" : ""}</p>
      </div>
    </div>
  );
}
