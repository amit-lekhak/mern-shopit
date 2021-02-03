import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  let shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus, id;

  if (order) {
    shippingInfo = order.shippingInfo;
    orderItems = order.orderItems;
    paymentInfo = order.paymentInfo;
    user = order.user;
    totalPrice = order.totalPrice;
    orderStatus = order.orderStatus;
    id = order._id;
  }

  //   const {
  //     shippingInfo,
  //     orderItems,
  //     paymentInfo,
  //     user,
  //     totalPrice,
  //     orderStatus,
  //   } = order;

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address},${shippingInfo.city},${shippingInfo.postalCode},${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? "true" : "false";

  return (
    <Fragment>
      <MetaData title="Order Details" />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address: </b>
                {shippingDetails}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  orderStatus && String(orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div className="row my-5" key={item.product}>
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/products/${item.product}`}>
                          {item.namee}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;