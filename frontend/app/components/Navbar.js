import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/slices/products";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProducts({ name: searchInput }));
    setSearchInput("");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                value={searchInput}
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Search
              </button>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort by Category
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort by Price
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        setSortPrice("lowest");
                      }}
                    >
                      Lowest
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        setSortPrice("highest");
                      }}
                    >
                      highest
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
