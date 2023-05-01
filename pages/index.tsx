import Link from "next/link";

function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex justify-center items-center">
          <Link href="games">
            <button
              type="button"
              className="bg-blue-500 text-white px-8 py-4 rounded m-10"
              style={{ fontSize: "50px", width: "500px", height: "500px" }}
            >
              컴퓨터와 대전하기
            </button>
          </Link>
          <button
            type="button"
            className="bg-blue-500 text-white px-8 py-4 rounded m-10"
            style={{ fontSize: "50px", width: "500px", height: "500px" }}
          >
            유저와 대전하기
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
