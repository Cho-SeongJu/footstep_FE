const Problem = () => {
  return (
    <section className="w-full min-h-screen flex flex-col lg:justify-center py-16 bg-gray-006">
      <div className="flex flex-col justify-center items-center w-full mx-auto">
        <p className="sm:text-4xl text-2xl">이런 문제들을</p>
        <p className="mt-2 sm:text-4xl text-2xl ">경험하시지 않았나요?</p>
      </div>
      <div className="w-full grid 2xl:grid-cols-4 lg:grid-cols-2 place-items-center md:grid-cols-1 m-center mt-16 px-4 py-4 w-[90rem]">
        <div className="flex flex-col justify-center items-center 2xl:my-0 my-4 w-60 h-36 sm:w-80 sm:h-48 bg-white border border-gray-003 rounded-3xl sm:text-2xl text-lg shadow-lg">
          <p className="py-4">어떤 순서로 가야 좋을까?</p>
          <p className="py-4">여행 동선 짜기 너무 어렵네..</p>
        </div>
        <div className="flex flex-col justify-center items-center 2xl:my-0 my-4 w-60 h-36 sm:w-80 sm:h-48 bg-white border border-gray-003 rounded-3xl sm:text-2xl text-lg shadow-lg">
          <p className="py-4">여행은 같이 가기로 해놓고</p>
          <p className="py-4">왜 계획은 나 혼자 하는거지?</p>
        </div>
        <div className="flex flex-col justify-center items-center 2xl:my-0 my-4 w-60 h-36 sm:w-80 sm:h-48 bg-white border border-gray-003 rounded-3xl sm:text-2xl text-lg shadow-lg">
          <p className="pt-4">장소 검색하느라</p>
          <p className="py-1">여러 페이지를 열다보니</p>
          <p className="py-4">아.. 정신없어.. </p>
        </div>
        <div className="flex flex-col justify-center items-center 2xl:my-0 my-4 w-60 h-36 sm:w-80 sm:h-48 bg-white border border-gray-003 rounded-3xl sm:text-2xl text-lg shadow-lg">
          <p className="pt-4">일단 단톡방은 만들었는데</p>
          <p className="pt-4">장소 검색한다고 왔다갔다하기</p>
          <p className="pb-4">너무 불편하네..</p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
