import React from "react";
import Image from "next/image";

import SloganStyles from "@/styles/components/Slogan.module.scss";

import sloganImage from "@/public/images/shutterstock@2x.png";

const Slogan: React.FC = () => {
  return (
    <div className={SloganStyles.slogan}>
      <Image src={sloganImage} alt="slogan" priority />
      <h1>გაყიდე და იყიდე დომენი მარტივად</h1>
    </div>
  );
};

export default Slogan;
