import { useState } from "react";

function generateRandomNumbers(numDigits: number): number[] {
  const numbers = new Set<number>();
  while (numbers.size < numDigits) {
    const randomNumber = Math.floor(Math.random() * 10);
    numbers.add(randomNumber);
  }
  return Array.from(numbers);
}

export default function CreateRandomCode() {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleClick = () => {
    console.log("gs");
    const numbers = generateRandomNumbers(4);
    setRandomNumbers(numbers);
  };

  const checkNumericAndUnique = (numbers: string[]) => {
    if (!/^[0-9]*$/.test(numbers.join(""))) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    return new Set(numbers).size === numbers.length;
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value;
    const arr = Array.from(str);
    // 들어오는 값들은 0-9사이의 값이여야한다.
    // 숫자가 아닌 값들이 들어오면 안된다.
    // 중복된 값들이 들어와서는 안된다.
    console.log(arr);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div className="flex">
          <input
            type="text"
            className="border rounded-md py-2 px-3 outline-none text-center mr-1"
            defaultValue=""
            maxLength={4}
            minLength={0}
            onInput={handleInputChange}
          />
        </div>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2`}
          onClick={handleClick}
          disabled={isButtonDisabled}
        >
          랜덤 숫자 생성하기
        </button>
        {isButtonDisabled ? <p>숫자 또는 숫자만 입력해주세요</p> : <p></p>}
      </div>
    </div>
  );
}
