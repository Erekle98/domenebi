import React from "react";

import { navbarLeftLinks, navbarRightLinks } from "./constants";

import NavBarStyles from "@/styles/components/NavBar.module.scss";

const NavBar: React.FC = (): JSX.Element => {
  const renderNavBarItems = (links: string[]): JSX.Element[] =>
    links.map(
      (link: string, index: number): JSX.Element => (
        <div key={index} className={NavBarStyles.navbar__container__item}>
          {link}
        </div>
      )
    );

  return (
    <div className={NavBarStyles.navbar}>
      <div className={NavBarStyles.navbar__container}>
        <div className={NavBarStyles.navbar__container__part}>
          {renderNavBarItems(navbarLeftLinks)}
        </div>
        <div className={NavBarStyles.navbar__container__part}>
          {renderNavBarItems(navbarRightLinks)}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
