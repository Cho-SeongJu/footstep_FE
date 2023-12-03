import { ReactComponent as Line } from "../../assets/line.svg";

const Step = () => {
  return (
    <section className="grid md:grid-cols-2 place-items-center w-full sm:h-screen h-[38rem] bg-gray-006">
      <div className="xl:ml-56 text-lg sm:text-2xl">
        <p className="py-2">일정 만드는 법 매우 간단해요.</p>
        <p className="py-2">여행일자, 가고싶은 장소만 선택하면</p>
        <p className="py-2">일정이 완성이 되는 발자국 플랫폼</p>
      </div>
      <div className="xl:mr-56 md:text-2xl sm:text-xl">
        <p className="sm:text-3xl text-xl font-bold">STEP</p>
        <div className="flex mt-4">
          <div className="flex justify-center items-center sm:w-[4.5rem] sm:h-[4.5rem] w-[3rem] h-[3rem] bg-red-001 rounded-[100%]">
            <p className="sm:text-3xl text-2xl font-bold text-white">1</p>
          </div>
          <div className="flex items-center ml-4">
            <p className="sm:text-xl text-lg">여행일자 선택</p>
          </div>
        </div>
        <Line className="sm:w-[4.4rem] w-[3rem]" />
        <div className="flex">
          <div className="flex justify-center items-center sm:w-[4.5rem] sm:h-[4.5rem] w-[3rem] h-[3rem] bg-orange-001 rounded-[100%]">
            <p className="sm:text-3xl text-2xl font-bold text-white">2</p>
          </div>
          <div className="flex items-center ml-4">
            <p className="sm:text-xl text-lg">장소 선택</p>
          </div>
        </div>
        <Line className="sm:w-[4.4rem] w-[3rem]" />
        <div className="flex">
          <div className="flex justify-center items-center sm:w-[4.5rem] sm:h-[4.5rem] w-[3rem] h-[3rem] bg-yellow-001 rounded-[100%]">
            <p className="sm:text-3xl text-2xl font-bold text-white">3</p>
          </div>
          <div className="flex items-center ml-4">
            <p className="sm:text-xl text-lg">일정 생성</p>
          </div>
        </div>
        <Line className="sm:w-[4.4rem] w-[3rem]" />
        <div className="flex">
          <div className="flex justify-center items-center sm:w-[4.5rem] sm:h-[4.5rem] w-[3rem] h-[3rem] bg-green-001 rounded-[100%]">
            <p className="sm:text-3xl text-2xl font-bold text-white">4</p>
          </div>
          <div className="flex items-center ml-4">
            <p className="sm:text-xl text-lg">일정 공유</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step;
