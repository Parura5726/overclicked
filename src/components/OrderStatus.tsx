import { Order } from "@/data";
import { Menu } from "@/menus";

export default function OrderStatus({
  menuItems,
  order,
  markAsPrepared,
}: {
  menuItems: Menu[];
  order: Order;
  markAsPrepared: (id: number) => void;
}) {
  return (
    <div className="order-status">
      <div>
        <h2>{`Order ${order.id}`}</h2>
        <p>Register {order.register}</p>
      </div>
      <div className="order-items">
        {order.amounts.map((amount, i) => 
          amount > 0 ? (
            <div key={i} className="order-item">
              <b>{menuItems[i].name}</b> <span>{amount}</span>
            </div>
          ) : null
        )}
      </div>
      <button onClick={() => markAsPrepared(order.id)}>Prepared</button>
    </div>
  );
}
