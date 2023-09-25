import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { FiltersState } from "@/interfaces/Market";

type Action =
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "UPDATE_PRICE_RANGE"; payload: { min: number; max: number } }
  | { type: "UPDATE_SYMBOL_COUNT_RANGE"; payload: { min: number; max: number } }
  | { type: "UPDATE_SELECTED_DOMAINS"; payload: string[] }
  | { type: "UPDATE_SELECTED_CATEGORIES"; payload: string[] };

const initialState: FiltersState = {
  name: "",
  priceRange: { min: 0, max: 1000 },
  symbolCountRange: { min: 1, max: 26 },
  selectedDomains: [],
  selectedCategories: [],
};

// Create the context
const FilterContext = createContext<
  | {
      state: FiltersState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

// Define the reducer function
const filtersReducer = (state: FiltersState, action: Action): FiltersState => {
  switch (action.type) {
    case "UPDATE_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_PRICE_RANGE":
      return { ...state, priceRange: action.payload };
    case "UPDATE_SYMBOL_COUNT_RANGE":
      return { ...state, symbolCountRange: action.payload };
    case "UPDATE_SELECTED_DOMAINS":
      return { ...state, selectedDomains: action.payload };
    case "UPDATE_SELECTED_CATEGORIES":
      return { ...state, selectedCategories: action.payload };
    default:
      return state;
  }
};

// Create the AppProvider component
export const FiltersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(filtersReducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

// Create a custom hook to access the context
export const useFiltersContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
