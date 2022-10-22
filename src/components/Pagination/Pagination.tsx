import clsx from 'clsx';
import React, { useState } from 'react';

import ButtonRounded from '../Button/ButtonRounded';

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage?: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
  onClickNext: (page: number) => void;
  onClickPrev: (page: number) => void;
}

function Pagination({
  totalCount,
  pageSize,
  currentPage: _currPage,
  siblingCount = 5,
  onPageChange,
  onClickNext,
  onClickPrev,
}: PaginationProps): JSX.Element {
  const totalPage = Math.ceil(totalCount / pageSize) || 1;
  const [currentPage, setCurrentPage] = useState(_currPage || 1);

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / siblingCount) * siblingCount;
    const pagination = [];
    const limit =
      start + siblingCount > totalPage ? totalPage : start + siblingCount;

    for (let i = start; i < limit; i += 1) {
      pagination.push(i + 1);
    }
    return pagination;
  };

  const handleClickPrev = () => {
    onClickPrev(currentPage - 1);
    setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (page: number) => () => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handleClickNext = () => {
    onClickNext(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  const pg = getPaginationGroup();

  const isDisableNext = currentPage === totalPage || totalPage === 0;
  const isDisablePrev = currentPage === 1 || totalPage === 0;
  const isShowPrev = currentPage > siblingCount;
  const isShowNext =
    totalPage > siblingCount && pg[0] + siblingCount - 1 < totalPage;

  return (
    <section id="pagination" className="flex space-x-4">
      {/* previous button */}
      <ButtonRounded
        className="group"
        onClick={handleClickPrev}
        disabled={isDisablePrev}
      >
        <img
          loading="lazy"
          width={12}
          height={12}
          style={{
            transform: 'rotate(90deg)',
          }}
          // Inverse black to white when hover
          className={clsx(
            !isDisablePrev && 'group-hover:invert group-hover:brightness-0',
            isDisablePrev && 'opacity-60',
          )}
          alt="next"
          src="https://ekrutassets.s3.ap-southeast-1.amazonaws.com/fe_static/icons/arrow_down_icon.svg"
        />
      </ButtonRounded>
      {isShowPrev && (
        <ButtonRounded className="hidden sm:block">
          <span>...</span>
        </ButtonRounded>
      )}

      {/* show page numbers */}
      {pg.map((item) => (
        <ButtonRounded
          color={currentPage === item ? 'primary' : 'default'}
          key={item}
          onClick={handlePageChange(item)}
        >
          <span className="text-xs">{item}</span>
        </ButtonRounded>
      ))}
      {isShowNext && (
        <ButtonRounded className="hidden sm:block">
          <span>...</span>
        </ButtonRounded>
      )}

      {/* next button */}
      <ButtonRounded
        onClick={handleClickNext}
        disabled={isDisableNext}
        className="group"
      >
        <img
          loading="lazy"
          style={{
            transform: 'rotate(270deg)',
          }}
          width={12}
          height={12}
          alt="next"
          // Inverse black to white when hover
          className={clsx(
            !isDisableNext && 'group-hover:invert  group-hover:brightness-0',
            isDisableNext && 'opacity-60',
          )}
          src="https://ekrutassets.s3.ap-southeast-1.amazonaws.com/fe_static/icons/arrow_down_icon.svg"
        />
      </ButtonRounded>
    </section>
  );
}

export default Pagination;
