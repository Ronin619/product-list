import { useState } from "react";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    searchInput("");
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
                onClick={() => handleSubmit()}
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
                        setPrice("lowest");
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
                        setPrice("highest");
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
