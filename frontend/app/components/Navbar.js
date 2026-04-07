import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/products";
import { fetchCategories } from "../../store/slices/products";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.products.categories);

  const categoryDropDownList = categories.map((category) => (
    <li key={category}>
      <a
        className="dropdown-item"
        onClick={(e) => {
          e.preventDefault();
          setCategoryOpen(!category);
        }}
      >
        {category}
      </a>
    </li>
  ));

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
                  onClick={(e) => {
                    e.preventDefault();
                    setCategoryOpen(!categoryOpen);
                  }}
                >
                  Sort by Category
                </a>
                {categoryOpen && (
                  <ul className="dropdown-menu show">{categoryDropDownList}</ul>
                )}
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPriceOpen(!priceOpen);
                  }}
                >
                  Sort by Price
                </a>
                {priceOpen && (
                  <ul className="dropdown-menu show">
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          setSortPrice("lowest");
                          setPriceOpen(false);
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
                          setPriceOpen(false);
                        }}
                      >
                        highest
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
