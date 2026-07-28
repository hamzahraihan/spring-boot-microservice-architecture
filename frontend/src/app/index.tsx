import "./home.css";
import { Link } from "react-router";
import ProductList from "../feature/product/components/product-list";
import { useKeycloak } from "../hooks/useKeycloak";

function Home() {
  const { isAuthenticated } = useKeycloak();

  return (
    <div className="container">
      <div className="home-header">
        <div>
          <h1 className="home-title">Products</h1>
          <p className="home-subtitle">
            Browse available items and place secure orders.
          </p>
        </div>

        {isAuthenticated && (
          <Link to="/add-product" className="admin-link">
            Admin: Add Product
          </Link>
        )}
      </div>

      <ProductList />
    </div>
  );
}

export default Home;
