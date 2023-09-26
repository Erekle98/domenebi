import React from "react";
import Image from "next/image";

import Filters from "../Filters";

import mobileFilters from "@/styles/components/mobile/Filters.module.scss";

import ExitIcon from "@/public/images/mobile/exit.svg";

const MobileFilters = ({
  handleCloseFilters,
}: {
  handleCloseFilters: () => void;
}) => {
  return (
    <div className={mobileFilters.filter}>
      <div className={mobileFilters.filter__title}>
        <div>ფილტრი</div>
        <Image
          src={ExitIcon}
          alt="Exit icon"
          onClick={() => handleCloseFilters()}
        />
      </div>
      <Filters />
      <div className={mobileFilters.filter__buttonContainer}>
        <button onClick={() => handleCloseFilters()}>ძიება</button>
      </div>
    </div>
  );
};

export default MobileFilters;
