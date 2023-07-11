import React, { useState } from "react";

function usePaginate(data,totalRecords, itemsPerPage) {

    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data?.length|| totalRecords / Number(itemsPerPage));

    function currentData() {
        const begin = (Number(currentPage) - 1) * Number(itemsPerPage);
        const end = Number(begin) + Number(itemsPerPage);
        const fData = data?.length ?data?.slice(begin, end): [];
        return fData
    }

    function next() {
        setCurrentPage(currentPage => Math.min(Number(currentPage) + 1, maxPage));
    }

    function prev() {
        setCurrentPage(currentPage => Math.max(Number(currentPage) - 1, 1));
    }

    function jump(page) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
    }

    return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePaginate;
