import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProducts, setFilter } from "../../store/slices/products";

export default function Pagination() {
  const totalPages = useSelector((state) => state.products.totalPages);
  const filters = useSelector((state) => state.products.filters);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);
  const dispatch = useDispatch();

  const pages = pagesArr.map((page) => (
    <li className="page-item" key={page}>
      <a className="page-link" onClick={() => setCurrentPage(page)}>
        {page}
      </a>
    </li>
  ));

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, ...filters }));
  }, [currentPage, dispatch, filters]);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => {
              if (currentPage === 1) return;
              setCurrentPage(currentPage - 1);
            }}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pages}
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => {
              if (currentPage === totalPages) return;
              setCurrentPage(currentPage + 1);
            }}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
