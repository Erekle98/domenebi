import React from "react";
import Image from "next/image";
import Link from "next/link";

import headerStyles from "@/styles/components/Header.module.scss";

import HeaderLogo from "@/public/images/logo@2x.png";
import BellIcon from "@/public/images/bell.svg";
import CartIcon from "@/public/images/cart-gray.svg";
import FlagGeIcon from "@/public/images/flag-ge.svg";
import UserIcon from "@/public/images/user.svg";
import ArrowDownIcon from "@/public/images/arrow-down.svg";

const Header: React.FC = () => {
  const itemClass: string = headerStyles.header__rightContent__item;

  return (
    <div className={headerStyles.header}>
      <div className={headerStyles.header__leftContent}>
        <Link href={"/"}>
          <Image src={HeaderLogo} alt="logo" priority />
        </Link>
      </div>
      <div className={headerStyles.header__rightContent}>
        <div className={itemClass}>
          <Image src={BellIcon} alt="Bell icon" />
        </div>
        <div className={itemClass}>
          <Image src={CartIcon} alt="Cart icon" />
        </div>
        <>
          <div className={headerStyles.header__rightContent__user}>
            <div
              className={headerStyles.header__rightContent__user__leftContent}
            >
              <Image src={UserIcon} alt="User icon" />
              <span>Kancha Co.</span>
            </div>
            <div
              className={headerStyles.header__rightContent__user__rightContent}
            >
              <Image src={ArrowDownIcon} alt="Arrow down icon" />
            </div>
          </div>
        </>
        <div className={itemClass}>
          <Image src={FlagGeIcon} alt="Georgian" />
        </div>
      </div>
    </div>
  );
};

export default Header;
