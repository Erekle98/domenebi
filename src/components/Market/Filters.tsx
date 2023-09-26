import React from "react";
import Image from "next/image";
import marketStyles from "@/styles/components/Market.module.scss";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { categories, domains } from "./constants";
import { useFiltersContext } from "@/context/FiltersContext";

import RemoveIcon from "@/public/images/cancel.svg";

interface RangeProps {
  min: number;
  max: number;
  values: { min: number; max: number };
  setValues: any;
  title: string;
  rangeType: string;
}

const Filters = () => {
  const { state, dispatch } = useFiltersContext();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_NAME", payload: event.target.value });
  };

  const handleNameRemove = () => {
    dispatch({ type: "UPDATE_NAME", payload: "" });
  };

  const handleDomainChange = (domain: string) => {
    const updatedSelectedDomains = state.selectedDomains.includes(domain);
    if (updatedSelectedDomains) {
      dispatch({
        type: "UPDATE_SELECTED_DOMAINS",
        payload: state.selectedDomains.filter((item) => item !== domain),
      });
    } else
      dispatch({
        type: "UPDATE_SELECTED_DOMAINS",
        payload: [...state.selectedDomains, domain],
      });
  };

  const handleCategoryChange = (category: string) => {
    const updatedSelectedCategories =
      state.selectedCategories.includes(category);
    if (updatedSelectedCategories) {
      dispatch({
        type: "UPDATE_SELECTED_CATEGORIES",
        payload: state.selectedCategories.filter((item) => item !== category),
      });
    } else
      dispatch({
        type: "UPDATE_SELECTED_CATEGORIES",
        payload: [...state.selectedCategories, category],
      });
  };

  const handlePriceRangeChange = (values: { min: number; max: number }) => {
    dispatch({ type: "UPDATE_PRICE_RANGE", payload: values });
  };

  const handleSymbolCountRangeChange = (values: {
    min: number;
    max: number;
  }) => {
    dispatch({ type: "UPDATE_SYMBOL_COUNT_RANGE", payload: values });
  };

  const renderCheckboxes = (
    dataArr: string[],
    selected: string[],
    changeHandler: (category: string) => void
  ) =>
    dataArr.map((category: string, index: number) => (
      <div
        key={index}
        className={
          marketStyles.market__mainSection__left__filter__categories__category
        }
      >
        <input
          type="checkbox"
          id={category}
          name={category}
          checked={selected.includes(category)}
          onChange={() => changeHandler(category)}
        />
        <label htmlFor={category}>{category}</label>
      </div>
    ));

  const renderRange = ({
    min,
    max,
    values,
    setValues,
    title,
    rangeType,
  }: RangeProps) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue =
        event.target.value === ""
          ? values.min
          : parseInt(event.target.value) > values.max
          ? values.max
          : parseInt(event.target.value);
      setValues({ ...values, [event.target.name]: newValue });
    };

    const rangeTypePrice = rangeType === "priceRange";
    const rangeTypeSymbolCount = rangeType === "symbolCountRange";

    return (
      <div className={marketStyles.market__mainSection__left__filter}>
        <div className={marketStyles.market__mainSection__left__filter__title}>
          {title}
        </div>
        <div className={marketStyles.market__mainSection__left__filter__range}>
          <div
            className={
              marketStyles.market__mainSection__left__filter__range__inputs
            }
          >
            <input
              type="number"
              min={min}
              max={max}
              name="min"
              value={
                rangeTypePrice
                  ? state.priceRange.min
                  : rangeTypeSymbolCount
                  ? state.symbolCountRange.min
                  : min
              }
              onChange={handleInputChange}
              className={
                marketStyles.market__mainSection__left__filter__range__inputs__input
              }
            />

            <input
              type="number"
              min={min}
              max={max}
              name="max"
              value={
                rangeTypePrice
                  ? state.priceRange.max
                  : rangeTypeSymbolCount
                  ? state.symbolCountRange.max
                  : max
              }
              onChange={handleInputChange}
              className={
                marketStyles.market__mainSection__left__filter__range__inputs__input
              }
            />
          </div>

          <div
            className={
              marketStyles.market__mainSection__left__filter__range__slider
            }
          >
            <InputRange
              minValue={min}
              maxValue={max}
              value={values}
              onChange={setValues}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={marketStyles.market__mainSection__left__searchInput}>
        <input
          type="text"
          placeholder="სახელი"
          value={state.name}
          onChange={handleNameChange}
          className={marketStyles.market__mainSection__left__searchInput__input}
        />
        <Image
          src={RemoveIcon}
          alt="remove"
          onClick={handleNameRemove}
          className={
            marketStyles.market__mainSection__left__searchInput__remove
          }
        />
      </div>

      {renderRange({
        min: 0,
        max: 1000,
        values: state.priceRange,
        setValues: handlePriceRangeChange,
        title: "ფასი",
        rangeType: "priceRange",
      })}
      {renderRange({
        min: 1,
        max: 26,
        values: state.symbolCountRange,
        setValues: handleSymbolCountRangeChange,
        title: "სიმბოლოების რაოდენობა",
        rangeType: "symbolCountRange",
      })}
      <div className={marketStyles.market__mainSection__left__filter}>
        <div className={marketStyles.market__mainSection__left__filter__title}>
          კატეგორიები
        </div>
        <div
          className={marketStyles.market__mainSection__left__filter__categories}
        >
          {renderCheckboxes(
            categories,
            state.selectedCategories,
            handleCategoryChange
          )}
        </div>
      </div>
      <div className={marketStyles.market__mainSection__left__filter}>
        <div className={marketStyles.market__mainSection__left__filter__title}>
          დომენის ზონა
        </div>
        <div
          className={marketStyles.market__mainSection__left__filter__categories}
        >
          {renderCheckboxes(domains, state.selectedDomains, handleDomainChange)}
        </div>
      </div>
    </>
  );
};

export default Filters;
