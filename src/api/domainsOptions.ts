import { IDomain } from "@/interfaces/Market";

export const updateDomainOptions = (updatedDomain: IDomain) => {
  return {
    optimisticData: (domains: IDomain[]) => {
      const prevTodos = domains.filter((domain) => {
        return domain.id !== updatedDomain.id;
      });
      return [...prevTodos, updatedDomain].sort((a, b) => a.id - b.id);
    },
    rollbackOnError: true,
    populateCache: (updated: IDomain, domains: IDomain[]) => {
      const prevTodos = domains.filter((domain) => {
        return domain.id !== updatedDomain.id;
      });
      return [...prevTodos, updated].sort((a, b) => a.id - b.id);
    },
    revalidate: false,
  };
};
