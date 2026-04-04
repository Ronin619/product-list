import { useSelector } from "react-redux";

export default function Pagination() {
  const totalPages = useSelector((state) => state.totalPages);
  const pagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);
  console.log(totalPages);

  const pages = pagesArr.map((page) => (
    <li className="page-item" key={page}>
      <a className="page-link" href="#">
        {page}
      </a>
    </li>
  ));

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pages}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
