import { useSelector } from "react-redux";
import Image from "next/image";

export default function ProductGrid() {
  const products = useSelector((state) => state.products.products);
  console.log(products);
  const card = products.map((product) => {
    return (
      <div className="card" key={product.id}>
        <div className="card-header">
          <p className="card-category">{`Category: ${product.category}`}</p>
          <h3 className="card-price">{product.price}</h3>
        </div>
        <div className="card-body">
          <Image
            src={product.image}
            width={200}
            height={200}
            alt="Picture of the product"
          ></Image>
          <h2 className="card-name">{product.name}</h2>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-3">{card}</div>
    </div>
  );
}
