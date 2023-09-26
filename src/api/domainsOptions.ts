import { IDomain } from "@/interfaces/Market";

export const updateDomainOptions = (updatedDomain: IDomain) => {
  const filterOutUpdatedDomain = (domain: IDomain) =>
    domain.id !== updatedDomain.id;
  const sortById = (a: IDomain, b: IDomain) => a.id - b.id;

  return {
    optimisticData: (domains: IDomain[]) => {
      const prevDomains = domains.filter(filterOutUpdatedDomain);
      return [...prevDomains, updatedDomain].sort(sortById);
    },
    rollbackOnError: true,
    populateCache: (updated: IDomain, domains: IDomain[]) => {
      const prevDomains = domains.filter(filterOutUpdatedDomain);
      return [...prevDomains, updated].sort(sortById);
    },
    revalidate: false,
  };
};
