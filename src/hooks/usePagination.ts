// src/hooks/usePagination.ts
import { useState, useMemo } from 'react';

interface PaginationOptions {
  totalItems: number;
  initialPage?: number;
  itemsPerPage?: number;
  maxPages?: number; // Max page buttons to show
}

interface PaginationResult {
  currentPage: number;
  totalPages: number;
  pageItems: number[];
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  startItem: number;
  endItem: number;
  visiblePageNumbers: number[];
}

/**
 * Hook that manages pagination logic
 */
export function usePagination({
  totalItems,
  initialPage = 1,
  itemsPerPage = 10,
  maxPages = 5,
}: PaginationOptions): PaginationResult {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate totalPages
  const totalPages = useMemo(() => 
    Math.max(1, Math.ceil(totalItems / itemsPerPage)),
    [totalItems, itemsPerPage]
  );

  // Ensure currentPage is within bounds
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Generate page numbers to display
  const visiblePageNumbers = useMemo(() => {
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    // Adjust if we're near the end
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages, maxPages]);

  // Get page navigation functions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  // Calculate the range of items being displayed
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  // Calculate the current items
  const pageItems = useMemo(() => {
    // In a real application, you would likely use this to slice your data array
    // This is a placeholder for the item indices
    return Array.from({ length: endItem - startItem + 1 }, (_, i) => startItem + i);
  }, [startItem, endItem]);

  return {
    currentPage,
    totalPages,
    pageItems,
    nextPage,
    prevPage,
    goToPage,
    startItem,
    endItem,
    visiblePageNumbers,
  };
}