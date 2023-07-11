import React, { forwardRef, useEffect, useState } from "react";
import usePaginate from '../customHook/usePaginate';
import classnames from 'classnames';
import './Pagination.css';
import { useImperativeHandle } from "react";

const PaginationComponent = forwardRef(({ data = [],
  onPageChange,
  pageSize,
  className,
  renderSize,
  footerStyle,
  showEntires,
  handleSizeChange,
  renderTableComponent,
  totalRecords
}, ref) => {
  const [itemsPerPage, setitemsPerPage] = useState(pageSize || 10);

  const [pageNumberLimit, setpageNumberLimit] = useState(2);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(2);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);


  const { next, prev, jump, currentData, currentPage, maxPage } = usePaginate(data || [], totalRecords, itemsPerPage)

  useImperativeHandle(ref, () => ({
    jumpToPage() {
      jump(1)
      setmaxPageNumberLimit(2);
      setminPageNumberLimit(0);
    },
  }));


  useEffect(() => {
    onPageChange(currentPage, currentData, maxPage);
  }, [currentPage, itemsPerPage, maxPage])

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length || totalRecords / itemsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          id={number}
          className={classnames('pagination-item', {
            selected: currentPage == number
          })}
          onClick={() => jump(number)}
          key={number.toString()}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    next()
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    prev()
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  console.log(data, totalRecords)

  if (data?.length || totalRecords) {
    return (
      <>
        {renderTableComponent && renderTableComponent(currentData())}

        <div className='pagination-footer' style={{ ...footerStyle }}>
          {showEntires && <div className='entries_wraper'>
            <p level={5} className="entries-inner">Show</p>
            <select
              className="pagination_enteries"
              onChange={(value) => {
                handleSizeChange ?
                  handleSizeChange(value.target.value) :
                  console.log("Not Passed Any Function");
                setitemsPerPage(value.target.value);
                jump(1)
                setmaxPageNumberLimit(2);
                setminPageNumberLimit(0);
              }}>
              {renderSize.length && renderSize.map((item) => <option value={item}>{item}</option>)}
            </select>
            <p level={5} className="entries-inner">Entries</p>
          </div>}
          <div className='pagination-footer' style={{ ...footerStyle }}>
            <ul className={classnames('pagination-container', { [className]: className })}>
              <li className={classnames('pagination-item arrow_wrap', {
                disabled: currentPage == pages[0]
              })}
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
              >
                {`<`}
              </li>
              {renderPageNumbers}
              <li style={
                {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 12px",
                  color: "#999"
                }
              }>
                Out of {maxPage} Pages
              </li>
              <li
                className={classnames('pagination-item arrow_wrap', {
                  disabled: currentPage == pages[pages.length - 1]
                })}
                onClick={handleNextbtn}>
                {`>`}
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
  
  return <></>

});

export default PaginationComponent;