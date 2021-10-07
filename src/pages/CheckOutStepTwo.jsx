import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { isProblemUser } from "../utils/Credentials";
import { ROUTES } from "../utils/Constants";
import { ShoppingCart } from "../utils/shopping-cart";
import { InventoryData } from "../utils/InventoryData";
import CartItem from "../components/CartItem";
import SwagLabsFooter from "../components/Footer";
import HeaderContainer from "../components/HeaderContainer";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "../components/Button";
import "./CheckOutStepTwo.css";

const CheckOutStepTwo = ({ history }) => {
  const clearCart = () => {
    /* istanbul ignore else */
    // No cart clear on order complete for the problem user
    if (!isProblemUser()) {
      // Wipe out our shopping cart
      ShoppingCart.resetCart();
    }
  };
  const contents = ShoppingCart.getCartContents();
  let orderTotal = 0;

  for (const curItem in contents) {
    orderTotal = orderTotal + InventoryData[contents[curItem]].price;
    if (isProblemUser()) {
      // double up for the problem user
      orderTotal = orderTotal + InventoryData[contents[curItem]].price;
    }
  }

  const orderTax = (orderTotal * 0.08).toFixed(2);

  return (
    <div id="page_wrapper" className="page_wrapper">
      <div id="contents_wrapper">
        <HeaderContainer secondaryTitle="Checkout: Overview" />
        <div
          id="checkout_summary_container"
          className="checkout_summary_container"
        >
          <div>
            <div className="cart_list" data-test="list-cart">
              <div className="cart_quantity_label" data-test="cart-qty">QTY</div>
              <div className="cart_desc_label" data-test="cart-description">DESCRIPTION</div>
              {contents.map((item, i) => {
                return <CartItem key={i} item={InventoryData[item]} />;
              })}
            </div>
            <div className="summary_info">
              <div className="summary_info_label" data-test="label-payment-information">Payment Information:</div>
              <div className="summary_value_label" data-test="value-payment-information">SauceCard #31337</div>
              <div className="summary_info_label" data-test="label-shipping-information">Shipping Information:</div>
              <div className="summary_value_label" data-test="value-shipping-information">
                FREE PONY EXPRESS DELIVERY!
              </div>
              <div className="summary_subtotal_label" data-test="label-subtotal">
                Item total: ${orderTotal}
              </div>
              <div className="summary_tax_label" data-test="label-tax">Tax: ${orderTax}</div>
              <div className="summary_total_label" data-test="label-total">
                Total: ${(orderTotal + parseFloat(orderTax)).toFixed(2)}
              </div>
              <div className="cart_footer">
                <Button
                  // `cart_cancel_link` has no style function
                  // but is there for backwards compatibility
                  customClass="cart_cancel_link"
                  label="Cancel"
                  onClick={(evt) => {
                    evt.preventDefault();
                    history.push(ROUTES.INVENTORY);
                  }}
                  size={BUTTON_SIZES.MEDIUM}
                  testId="button-cancel"
                  type={BUTTON_TYPES.BACK}
                />
                <Button
                  customClass="cart_button"
                  label="Finish"
                  onClick={(evt) => {
                    evt.preventDefault();
                    clearCart();
                    history.push(ROUTES.CHECKOUT_COMPLETE);
                  }}
                  size={BUTTON_SIZES.MEDIUM}
                  testId="button-finish"
                  type={BUTTON_TYPES.ACTION}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  );
};
CheckOutStepTwo.propTypes = {
  /**
   * The history
   */
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(CheckOutStepTwo);
