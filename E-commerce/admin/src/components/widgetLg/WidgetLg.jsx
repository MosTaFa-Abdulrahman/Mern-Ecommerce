import "./widgetLg.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";

function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="WidgetLg">
      <h3 className="WidgetLgTitle">Latest transiction</h3>
      <table className="WidgetLgTable">
        <tr className="WidgetLgtr">
          <th className="WidgetLgTh">Customer</th>
          <th className="WidgetLgTh">Date</th>
          <th className="WidgetLgTh">Amount</th>
          <th className="WidgetLgTh">Status</th>
        </tr>
        {orders.map((order) => (
          <tr className="WidgetLgtr" key={order._id}>
            <td className="WidgetLgTdUser">
              <span className="WidgetLgName">{order.userId}</span>
            </td>
            <td className="WidgetLgTdDate">{format(order.createdAt)}</td>
            <td className="WidgetLgTdAmount">{order.amount}$</td>
            <td className="WidgetLgTdStatus">
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default WidgetLg;
