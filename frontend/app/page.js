"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import ProductGrid from "./components/ProductGrid";
import { fetchProducts } from "../store/slices/products";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
