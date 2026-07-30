import { useCallback, useEffect, useRef, useState } from "react";
import { useKeycloak } from "../../../hooks/useKeycloak";
import { GetProduct } from "../api/get-product";
import ProductCard from "./product";
import { createOrder } from "../../order/api/create-order";
import "./product-list.css";
import type { OrderType, ProductType, UserDetails } from "../../../types/api";

type NoticeType = "success" | "error";

function ProductList() {
  const { keycloak, isAuthenticated, isInitialized, userDetails } =
    useKeycloak();
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [orderingSkuCode, setOrderingSkuCode] = useState<string | null>(null);
  const [notice, setNotice] = useState<{
    type: NoticeType;
    text: string;
  } | null>(null);

  const keycloakRef = useRef(keycloak);
  useEffect(() => {
    keycloakRef.current = keycloak;
  }, [keycloak]);

  const fetchProducts = useCallback(async () => {
    if (!keycloak?.token) {
      return;
    }

    try {
      setFetchError(null);
      setIsLoading(true);

      await keycloak.updateToken(30);

      const response = await GetProduct(keycloak.token);
      if (!response.ok) {
        setFetchError("We couldn't load products right now. Please try again.");
        setProducts(null);
        return;
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Fetch products failed", err);
      setFetchError("We couldn't load products right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    if (!isAuthenticated) {
      setProducts(null);
      return;
    }
    fetchProducts();
  }, [fetchProducts, isAuthenticated, isInitialized]);

  const handleOrder = async (data: OrderType) => {
    if (!isAuthenticated || !keycloak?.token) {
      setNotice({
        type: "error",
        text: "Please login before placing an order.",
      });
      return;
    }

    if (!data.quantity || data.quantity < 1) {
      setNotice({ type: "error", text: "Minimum order quantity is 1." });
      return;
    }

    const order: OrderType & { userDetails: UserDetails } = {
      ...data,
      userDetails: {
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      },
    };

    try {
      setOrderingSkuCode(data.skuCode);
      setNotice(null);
      const response = await createOrder(order, keycloak.token);
      if (response.status === 404) {
        setNotice({
          type: "error",
          text: "This product is no longer available.",
        });
        return;
      }
      if (response.status === 503) {
        setNotice({
          type: "error",
          text: "Order service is temporarily unavailable. Please try again.",
        });
        return;
      }
      if (!response.ok) {
        setNotice({
          type: "error",
          text: "Order failed. Please check your details and retry.",
        });
        return;
      }
      setNotice({ type: "success", text: await response.text() });
    } catch (err) {
      console.error("Failed to create order", err);
      setNotice({
        type: "error",
        text: "Unexpected error while placing your order. Please retry.",
      });
    } finally {
      setOrderingSkuCode(null);
    }
  };

  if (!isInitialized) {
    return (
      <div className="state-card" role="status">
        Checking sign-in status...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="state-card">
        <p className="state-title">Login required</p>
        <p className="state-description">
          Please login to view products and place orders.
        </p>
        <button className="btn btn-login" onClick={() => keycloak?.login()}>
          Login to Continue
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="state-card" role="status">
        Loading products...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="state-card">
        <p className="state-title">Unable to load products</p>
        <p className="state-description">{fetchError}</p>
        <button className="btn btn-login" onClick={fetchProducts}>
          Retry
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="state-card">
        <p className="state-title">No products available yet</p>
        <p className="state-description">
          Try again later or add products from the admin flow.
        </p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {notice && (
        <p className={`order-notice ${notice.type}`} role="status">
          {notice.text}
        </p>
      )}

      <ul className="container-product">
        {products.map((data: ProductType) => (
          <ProductCard
            key={data.id}
            data={data}
            handleOrder={handleOrder}
            isOrdering={orderingSkuCode === data.skuCode}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
