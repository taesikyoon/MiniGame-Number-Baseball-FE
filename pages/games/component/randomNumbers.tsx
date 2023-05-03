import { useState } from "react";

function generateRandomNumbers(numDigits: number): string[] {
  const numbers = new Set<string>();
  while (numbers.size < numDigits) {
    const randomNumber = Math.floor(Math.random() * 10);
    numbers.add(String(randomNumber));
  }
  return Array.from(numbers);
}

export default function NumberBaseballGame() {
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const startGameBtn = () => {
    console.log("Start !!! ");
  };

  const setRandomNumbers = () => {
    const numbers = generateRandomNumbers(4);
    console.log(numbers.join(""));
    setInputValue(numbers.join(""));
  };
  const checkNumericAndUnique = (numbers: string[]) => {
    if (!/^[0-9]*$/.test(numbers.join(""))) return true;

    return new Set(numbers).size !== 4;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value;
    const arr = Array.from(str);

    setIsButtonDisabled(checkNumericAndUnique(arr));
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
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2`}
          onClick={setRandomNumbers}
        >
          랜덤 숫자 생성하기
        </button>
        {isButtonDisabled ? <p>숫자 또는 숫자만 입력해주세요</p> : <p></p>}
      </div>
      <div>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2`}
          onClick={startGameBtn}
          disabled={isButtonDisabled}
        >
          게임 시작
        </button>
      </div>
    </div>
  );
}
