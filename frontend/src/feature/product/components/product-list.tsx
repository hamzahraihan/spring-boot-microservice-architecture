import { useEffect, useState } from "react";
import { useKeycloak } from "../../../hooks/useKeycloak";
import { GetProduct } from "../api/get-product";
import ProductCard from "./product";
import { createOrder } from "../../order/api/create-order";
import "./product-list.css";
import type { OrderType, ProductType, UserDetails } from "../../../types/api";

function ProductList() {
  const { keycloak, isAuthenticated, isInitialized, userDetails } =
    useKeycloak();
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    // if keycloak isn't ready yet, do absolutely nothing.
    if (!isInitialized) return;
    // Only fetch if the token is available
    if (!keycloak?.token) {
      return;
    }

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await GetProduct(keycloak?.token);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch products is failed", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [keycloak?.token]);

  const handleOrder = async (data: OrderType) => {
    const order: OrderType & { userDetails: UserDetails } = {
      ...data,
      userDetails: {
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      },
    };
    console.log(order);
    const response = await createOrder(order, keycloak?.token);
    if (data.quantity == 0 || data.quantity == undefined) {
      alert("Minimum order quantity is 1");
      return;
    }
    if (response.status == 404) {
      alert("Product not found");
    }
    if (response.status == 503) {
      alert("Failed to order. Please try again later.");
    }
    if (response.ok) {
      alert(await response.text());
    }
  };

  console.log(products);
  if (isloading) return <div>loading...</div>;
  if (!products) return <div>No products found</div>;
  if (!isAuthenticated) return <div>You have to login</div>;

  return (
    <div className="product-list">
      <ul className="container-product">
        {products?.map((data: ProductType) => (
          <ProductCard key={data.id} data={data} handleOrder={handleOrder} />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
