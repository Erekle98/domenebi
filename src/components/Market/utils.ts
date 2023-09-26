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
        if (item.name.includes(domain)) {
          if (domain === ".ge") {
            if (item.name.split(".")[1] === "ge") {
              return true;
            }
          } else {
            return true;
          }
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
