import React from "react";
import Image from "next/image";

import marketStyles from "@/styles/components/mobile/TopSection.module.scss";

import FilterIcon from "@/public/images/mobile/filter.svg";
import DropdownIcon from "@/public/images/mobile/dropdown.svg";
import MobileFilters from "./Filters";

const TopSection = () => {
  const filtersRef = React.useRef<HTMLDivElement>(null);

  const handleOpenFilters = () => {
    if (filtersRef.current) {
      filtersRef.current.style.display = "block";
    }
  };

  const handleCloseFilters = () => {
    if (filtersRef.current) {
      filtersRef.current.style.display = "none";
    }
  };

  return (
    <div className={marketStyles.mobileTopSection}>
      <div
        className={marketStyles.mobileTopSection__filter}
        onClick={() => handleOpenFilters()}
      >
        <div>ფილტრი</div>
        <Image src={FilterIcon} alt="Filter icon" />
      </div>
      <div className={marketStyles.mobileTopSection__sort}>
        <div>სორტირება</div>
        <Image src={DropdownIcon} alt="Arrow down" />
      </div>
      <div className={marketStyles.filter} ref={filtersRef}>
        <MobileFilters handleCloseFilters={handleCloseFilters} />
      </div>
    </div>
  );
};

export default TopSection;
