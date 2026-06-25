import { Link, Outlet } from "react-router";
import "./product-layout.css";

function ProductLayout() {
  return (
    <div className="container">
      <div className="nav-product">
        <h1>Product Page</h1>
        <Link to="/">Back</Link>
      </div>
      <Outlet />
    </div>
  );
}
export default ProductLayout;
