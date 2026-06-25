import "./home.css";
import { Link } from "react-router";
import ProductList from "../feature/product/components/product-list";

function Home() {
  return (
    <div className="container">
      <div className="flex" style={{ paddingBottom: 20 }}>
        <h1>
          <Link
            to="/product"
            style={{ textDecoration: "none", color: "black" }}
          >
            Product
          </Link>
        </h1>
        <Link to="/add-product">Add Product</Link>
      </div>

      <ProductList />
    </div>
  );
}

export default Home;
