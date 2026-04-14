"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import ProductGrid from "./components/ProductGrid";
import { fetchProducts } from "../store/slices/products";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    async function getUser() {
      const getUser = await axios.get(
        "http://localhost:8000/api/current_user",
        {
          withCredentials: true,
        },
      );
      if (!getUser.data) {
        router.push("/login");
      }
    }
    getUser();
  });

  return (
    <>
      <Navbar />
      <div className="product-grid">
        <ProductGrid />
      </div>
      <Pagination />
    </>
  );
}
