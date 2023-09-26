import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { addOnCart } from "@/store/slices/onCartSlice";
import { updateDomain } from "@/api/domainsApi";
import { updateDomainOptions } from "@/api/domainsOptions";
import { IDomain } from "@/interfaces/Market";

import marketStyles from "@/styles/components/Market.module.scss";

import CartIcon from "@/public/images/cart-white.svg";
import ArrowIcon from "@/public/images/Btn_send.svg";
import ArrowIconHover from "@/public/images/Btn_send-1.svg";
import TickIcon from "@/public/images/tick.svg";
import NotFoundIcon from "@/public/images/not-found.svg";

interface Props {
  isLoading: boolean;
  error: any;
  tableData: IDomain[];
  mutate: any;
}

const DomainsTable = ({ isLoading, error, tableData, mutate }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  const itemsOnCarts = useSelector((state: any) => state.onCartItems.count);

  const processedItemsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (tableData) {
      tableData.forEach((item: IDomain) => {
        if (
          item.isAddedToCart &&
          !processedItemsRef.current.has(item.id.toString())
        ) {
          dispatch(addOnCart());
          processedItemsRef.current.add(item.id.toString());
        }
      });
    }
  }, [tableData]);

  const updateDomainMutation = async (updatedDomain: IDomain) => {
    try {
      await mutate(
        updateDomain(updatedDomain),
        updateDomainOptions(updatedDomain)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleItemAddToCart = async (item: IDomain) => {
    const updatedItem = { ...item, isAddedToCart: true };
    await updateDomainMutation(updatedItem);
    if (!processedItemsRef.current.has(item.id.toString())) {
      dispatch(addOnCart());
      processedItemsRef.current.add(item.id.toString()); // Mark the item as processed.
    }
  };

  const renderTableItems = () => {
    return tableData.map((item: IDomain, index: number) => {
      const isHovered = hoveredIndex === index;

      return (
        <motion.div
          key={index}
          className={marketStyles.market__mainSection__right__item}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <div className={marketStyles.market__mainSection__right__item__left}>
            <div
              className={
                marketStyles.market__mainSection__right__item__left__arrowIcon
              }
            >
              <Image
                src={isHovered ? ArrowIconHover : ArrowIcon}
                alt="arrow icon"
              />
            </div>
            <div
              className={
                marketStyles.market__mainSection__right__item__left__name
              }
            >
              {item.name}
            </div>
          </div>
          {item.isAddedToCart ? (
            <div
              className={
                marketStyles.market__mainSection__right__item__addedToCart
              }
            >
              <Image src={TickIcon} alt="Tick icon" />
              <div>კალათშია</div>
            </div>
          ) : (
            <>
              <div
                className={marketStyles.market__mainSection__right__item__right}
              >
                <div
                  className={
                    marketStyles.market__mainSection__right__item__right__price
                  }
                >
                  <div
                    className={
                      marketStyles.market__mainSection__right__item__right__price__gel
                    }
                  >
                    {item.price}
                    <span> ₾</span>
                  </div>
                  <div
                    className={
                      marketStyles.market__mainSection__right__item__right__price__usd
                    }
                  >
                    {(item.price * 2.6).toFixed(2)}
                    <span> $</span>
                  </div>
                </div>

                <motion.div
                  className={
                    marketStyles.market__mainSection__right__item__right__cart
                  }
                  onClick={() => handleItemAddToCart(item)}
                  initial={{ width: "50px" }}
                  animate={{ width: isHovered ? "110px" : "36px" }}
                  transition={{ duration: 0.2 }}
                >
                  {isHovered && (
                    <div
                      className={
                        marketStyles.market__mainSection__right__item__right__cart__text
                      }
                    >
                      დამატება
                    </div>
                  )}
                  <Image src={CartIcon} alt="cart icon" />
                </motion.div>
              </div>
            </>
          )}
        </motion.div>
      );
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!tableData.length) {
    return (
      <div className={marketStyles.market__mainSection__right__notFound}>
        <Image src={NotFoundIcon} alt="Not found" />
        <div
          className={marketStyles.market__mainSection__right__notFound__title}
        >
          დომენი ვერ მოიძებნა
        </div>
        <div
          className={marketStyles.market__mainSection__right__notFound__text}
        >
          მითითებული პარამეტრებით დომენების მარკეტში შედეგები ვერ მოიძებნა,
          შეცვალეთ ძიების პარამეტრები და ცადეთ თავიდან
        </div>
      </div>
    );
  }

  return (
    <div className={marketStyles.market__mainSection__right}>
      {renderTableItems()}
    </div>
  );
};

export default DomainsTable;
