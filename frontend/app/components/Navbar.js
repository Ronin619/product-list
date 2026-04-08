import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setFilter } from "../../store/slices/products";
import { fetchCategories } from "../../store/slices/products";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryOption, setCategoryOption] = useState("");
  const [priceOption, setPriceOption] = useState("");
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
          dispatch(fetchProducts({ category: category }));
          dispatch(
            setFilter({
              name: searchInput,
              price: "",
              category: categoryOption,
            }),
          );
          setCategoryOption(category);
          setCategoryOpen(false);
        }}
      >
        {category}
      </a>
    </li>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProducts({ name: searchInput }));
    dispatch(
      setFilter({
        name: searchInput,
        price: "",
        category: categoryOption,
      }),
    );
    setSearchInput("");
    setCategoryOption("");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                type="search"
                value={searchInput}
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
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
                  Search by Category
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
                          const price = "lowest";
                          dispatch(
                            fetchProducts({
                              price: price,
                              category: categoryOption,
                            }),
                          );
                          dispatch(
                            setFilter({
                              name: searchInput,
                              price: price,
                              category: categoryOption,
                            }),
                          );
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
                          const price = "highest";
                          dispatch(
                            fetchProducts({
                              price: price,
                              category: categoryOption,
                            }),
                          );
                          dispatch(
                            setFilter({
                              name: searchInput,
                              price: price,
                              category: categoryOption,
                            }),
                          );
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
