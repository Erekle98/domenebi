import { FiltersState, IDomain } from "@/interfaces/Market";

export const applyFilters = (data: IDomain[], filters: FiltersState) => {
  const {
    name,
    selectedCategories,
    selectedDomains,
    priceRange,
    symbolCountRange,
  } = filters;

  if (!data) return;

  let filteredData = data;

  if (name.length > 0) {
    filteredData = filteredData.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (selectedCategories.length > 0) {
    filteredData = filteredData.filter((item) => {
      for (const category of selectedCategories) {
        if (item.categories.includes(category)) {
          return true;
        }
      }
    });
  }

  if (selectedDomains.length > 0) {
    filteredData = filteredData.filter((item) => {
      for (const domain of selectedDomains) {
        if (domain === ".ge") {
          return item.name.split(".").length === 2;
        } else if (item.name.includes(domain)) {
          return true;
        }
      }
      return false;
    });
  }

  filteredData = filteredData.filter(
    (item) => item.price >= priceRange.min && item.price <= priceRange.max
  );

  filteredData = filteredData.filter(
    (item) =>
      item.name.length >= symbolCountRange.min &&
      item.name.length <= symbolCountRange.max
  );

  return filteredData;
};
