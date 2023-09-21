import React from "react";
import SloganStyles from "@/styles/components/Slogan.module.scss";

const Slogan: React.FC = () => {
  return (
    <div className={SloganStyles.slogan}>
      <h1>გაყიდე და იყიდე დომენი მარტივად</h1>
    </div>
  );
};

export default Slogan;
