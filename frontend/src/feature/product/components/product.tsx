import type { Dispatch, SetStateAction } from "react";
import type { ProductType } from "./product-list";
import "./product.css";
import type { OrderType } from "../../order/type/ordertype";

function ProductCard({
  data,
  qty,
  setQty,
  handleOrder,
}: {
  data: ProductType;
  qty: number;
  setQty: Dispatch<SetStateAction<number>>;
  handleOrder: (data: OrderType) => void;
}) {
  return (
    <div key={data.id} className="card">
      <div>
        <ul>
          <li>
            <h2>{data.name}</h2>
          </li>
          <li>
            <p>Price: ${data.price}</p>
          </li>
        </ul>
        <p>Quantity</p>
        <input
          type="number"
          id="qty"
          name="qty"
          value={qty}
          min={1}
          onChange={(e) => setQty(e.target.valueAsNumber)}
          className="input-product"
          required
        />
      </div>
      <button
        className=""
        onClick={() =>
          handleOrder({ skuCode: data.skuCode, price: data.price, qty: qty })
        }
      >
        Order Now
      </button>
    </div>
  );
}
export default ProductCard;
