import { Link } from "react-router";
import ProductList from "../../feature/product/components/product-list";

function ProductPage() {
  return (
    <div>
      <div className="flex" style={{ paddingBottom: 20 }}>
        <h2>Product</h2>
        <Link to="/add-product">Add Product</Link>
      </div>
      <ProductList />
    </div>
  );
}

export default ProductPage;
