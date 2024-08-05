import "../assets/css/AddToBag.scss";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { ProductAddToBag } from "./ProductAddToBag";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productAction";
import { getRandomInt } from "../Helper";
import { useNavigate } from "react-router-dom";

export const AddToBag = ({ product, item, isOpen, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productReducer.productList);
  const shoppingCart = useSelector(
    (state) => state.shoppingReducer.shoppingCart,
  );
  const [goeswellwith, setGoeswellwith] = useState([]);
  const [random, setRandom] = useState(getRandomInt(3));

  useEffect(() => {
    setGoeswellwith([]);
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (productList && productList.length > 0) {
      let goeswellwithList = [];
      for (let i = 0; i < 4; i++) {
        let prod = productList[getRandomInt(productList.length - 1)];
        if (
          prod.productId !== product.productId &&
          !goeswellwith.includes((p) => p.productId === prod.productId)
        ) {
          goeswellwithList.push(prod);
        }
      }
      setGoeswellwith(goeswellwithList);
    }
  }, [productList]);

  return (
    <Dialog
      open={isOpen}
      scroll="body"
      sx={{ "& .MuiDialog-paper": { maxWidth: "950px" } }}
    >
      <DialogContent>
        {/*<div className="addtobag-overlay">*/}
        <div className="addtobag-container">
          {/*<p>1.You've Got Great Taste</p>*/}
          {/*<p>2.Nice Pick!</p>*/}
          {/*<p>3.Expect Compliments</p>*/}
          {/*<p>4.We Love It Too</p>*/}
          <div className="first-row">
            {random === 0 && (
              <div className="add-to-your-bag">Added To Your Bag</div>
            )}
            {random === 1 && <div className="add-to-your-bag">Nice Pick!</div>}
            {random === 2 && (
              <div className="add-to-your-bag">Expect Compliments</div>
            )}
            {random === 3 && (
              <div className="add-to-your-bag">We Love It Too</div>
            )}
            <ShoppingBagOutlinedIcon className="bag-icon" />
            <div className="bag-item">{shoppingCart.total} Items</div>
            <div className="close-icon">
              <CloseOutlinedIcon onClick={handleClose} />
            </div>
          </div>

          <div className="second-row">
            <div className="col-1">
              <img src={item.imageUrl} alt="" />
              <div className="item-detail">
                <div className="name">{item.productName}</div>
                <div className="size">Size: {item.size}</div>
                <div className="money">${item.price}.00 CAD</div>
              </div>
            </div>
            <div className="col-2">
              <div className="subtotal">
                <p>Subtotal</p>
                <p>${shoppingCart.totalCost}.00</p>
              </div>
              <button
                onClick={() => {
                  navigate("/shop/cart");
                }}
              >
                VIEW BAG & CHECKOUT
              </button>
              <div className="continue">
                <div className="continue-shopping" onClick={handleClose}>
                  CONTINUE SHOPPING
                </div>
                <div className="continue-icon">
                  <EastOutlinedIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="third-row">
            <div className="name">Goes well with</div>
            <div className="addtobag-swiper-container">
              <ul className="addtobag-swiper-wrapper">
                {console.log("goeswellwith", goeswellwith)}
                {goeswellwith &&
                  goeswellwith.map((product) => (
                    <ProductAddToBag
                      key={product.productId}
                      product={product}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
        {/*</div>*/}
      </DialogContent>
    </Dialog>
  );
};
