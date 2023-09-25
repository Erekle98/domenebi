import React, { useMemo } from "react";
import marketStyles from "@/styles/components/Market.module.scss";

import { sortItems } from "./constants";
import Filters from "./Filters";
import DomainsTable from "./DomainsTable";
import useSWR from "swr";
import { getDomains, domainsUrlEndpoint as cacheKey } from "@/api/domainsApi";
import { IDomain } from "@/interfaces/Market";
import { useFiltersContext } from "@/context/FiltersContext";
import { applyFilters } from "./utils";

const Market: React.FC = () => {
  const { state } = useFiltersContext();
  const {
    isLoading,
    error,
    data: tableData,
    mutate,
  } = useSWR(cacheKey, getDomains, {
    onSuccess: (data: IDomain[]) => {
      data.sort((a, b) => a.id - b.id);
    },
  });

  const data = useMemo(() => {
    return applyFilters(tableData, state);
  }, [tableData, state]);

  const renderSortItems = sortItems.map(
    (item: string, index: number): JSX.Element => (
      <div
        key={index}
        className={marketStyles.market__topSection__right__left__item}
      >
        {item}
      </div>
    )
  );

  return (
    <div className={marketStyles.market}>
      <div className={marketStyles.market__topSection}>
        <div className={marketStyles.market__topSection__left}>
          დომენები მარკეტზე:{" "}
          <span className={marketStyles.market__topSection__left__domainQty}>
            {data?.length}
          </span>
        </div>
        <div className={marketStyles.market__topSection__right}>
          <div className={marketStyles.market__topSection__right__left}>
            <div className={marketStyles.market__topSection__right__left__sort}>
              სორტირება:
            </div>
            {renderSortItems}
          </div>
          <div className={marketStyles.market__topSection__right__right}>
            როგორ გავყიდო დომენი?
          </div>
        </div>
      </div>
      <div className={marketStyles.market__mainSection}>
        <Filters />
        <DomainsTable
          isLoading={isLoading}
          error={error}
          tableData={data || []}
          mutate={mutate}
        />
      </div>
    </div>
  );
};

export default Market;
