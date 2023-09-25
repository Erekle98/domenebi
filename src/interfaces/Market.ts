export interface IDomain {
  id: number;
  name: string;
  price: number;
  categories: string[];
  isAddedToCart: boolean;
}

export interface FiltersState {
  name: string;
  priceRange: { min: number; max: number };
  symbolCountRange: { min: number; max: number };
  selectedDomains: string[];
  selectedCategories: string[];
}
