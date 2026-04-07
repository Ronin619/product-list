import { useSelector } from "react-redux";
import Image from "next/image";

export default function ProductGrid() {
  const products = useSelector((state) => state.products.products);

  const card = products.map((product) => {
    return (
      <div className="col-md-4" key={product.id}>
        <div className="card">
          <div className="card-header">
            <p className="card-category">{`Category: ${product.category}`}</p>
            <h3 className="card-price">{product.price}</h3>
          </div>
          <div className="card-body">
            <Image
              src={product.image}
              width={200}
              height={200}
              alt={product.name}
              unoptimized
            ></Image>
            <h2 className="card-name">{product.name}</h2>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container" style={{ maxWidth: "900px" }}>
      <div className="row row-cols-1 row-cols-md-3 g-4">{card}</div>
    </div>
  );
}
