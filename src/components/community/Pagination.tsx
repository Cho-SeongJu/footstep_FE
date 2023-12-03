import { useEffect, useState } from "react";
import { ReactComponent as LeftArrow } from "../../assets/arrow-left-circle.svg";
import { ReactComponent as RightArrow } from "../../assets/arrow-right-circle.svg";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  setPage: (page: number) => void;
}

const Pagination = ({ totalPage, currentPage, setPage }: PaginationProps) => {
  const [pages, setPages] = useState<number[]>([]);

  const handlePrevious = () => {
    if (totalPage > 0) {
      setPage(currentPage - 1);
    }
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleNext = () => {
    setPage(currentPage + 1);
  };

  const createPages = () => {
    const pageArr: number[] = [];
    for (let i = 1; i <= totalPage; i++) {
      pageArr.push(i);
    }
    setPages([...pageArr]);
  };

  useEffect(() => {
    createPages();
  }, [totalPage]);

  return (
    <div className="flex justify-center items-center my-8">
      <button
        className="px-4 py-2 rounded-md hover:scale-105 transition-all duration-250"
        onClick={handlePrevious}
        disabled={currentPage === 1 ? true : false}
      >
        <LeftArrow
          width={20}
          height={20}
        />
      </button>
      <div className="flex mx-2">
        {pages.map((page) => (
          <p
            key={page}
            className={`px-2 cursor-pointer ${
              currentPage === page && "text-blue-001"
            }`}
            onClick={() => onChangePage(page)}
          >
            {page}
          </p>
        ))}
      </div>
      <button
        className="px-4 py-2 rounded-md hover:scale-105 transition-all duration-250"
        onClick={handleNext}
        disabled={currentPage === totalPage ? true : false}
      >
        <RightArrow
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default Pagination;
