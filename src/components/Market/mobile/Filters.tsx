import React from "react";
import Image from "next/image";

import Filters from "../Filters";

import styles from "@/styles/components/mobile/Filters.module.scss";

import ExitIcon from "@/public/images/mobile/exit.svg";

interface Props {
  handleCloseFilters: () => void;
}

const MobileFilters: React.FC<Props> = ({ handleCloseFilters }) => {
  const handleSearch = () => {
    handleCloseFilters();
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__title}>
        <div>ფილტრი</div>
        <Image src={ExitIcon} alt="Exit icon" onClick={handleCloseFilters} />
      </div>
      <Filters />
      <div className={styles.filter__buttonContainer}>
        <button onClick={handleSearch}>ძიება</button>
      </div>
    </div>
  );
};

export default MobileFilters;
