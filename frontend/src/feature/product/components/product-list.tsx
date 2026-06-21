import { useCallback, useEffect, useState } from "react";
import { useKeycloak } from "../../../hooks/useKeycloak";
import { GetProduct } from "../api/get-product";
import ProductCard from "./product";
import type { OrderType } from "../../order/type/ordertype";
import { createOrder } from "../../order/api/create-order";

export type ProductType = {
  description: string;
  id: string;
  name: string;
  price: number;
  skuCode: string;
};

function ProductList() {
  const { keycloak, isAuthenticated, isInitialized } = useKeycloak();
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [isloading, setIsLoading] = useState(false);
  const [qty, setQty] = useState<number>(0);
  const [cart, setCart] = useState<OrderType>({
    qty: qty,
    price: 0,
    skuCode: "",
  });

  useEffect(() => {
    // 2. STALL: If Keycloak isn't ready yet, do absolutely nothing.
    if (!isInitialized) return;
    // Only fetch if the token is available
    if (!keycloak?.token) {
      return;
    }

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await GetProduct(keycloak?.token);
        setProducts(data);
      } catch (err) {
        console.error("Fetch products is failed", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [keycloak?.token]);

  const handleOrder = useCallback((data: OrderType) => {
    setCart(data);
    console.log(data);
    // createOrder(cart);
  }, []);
  console.log(products);
  if (isloading) return <div>loading...</div>;
  if (!products) return <div>No products found</div>;
  if (!isAuthenticated) return <div>You have to login</div>;

  return (
    <div>
      <ul>
        {products.map((data: ProductType) => (
          <ProductCard
            key={data.id}
            data={data}
            qty={qty}
            setQty={setQty}
            handleOrder={handleOrder}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
