"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faFileArrowDown,
  faPencil,
  faRotateBack,
  faRotateForward,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { menuItems } from "@/constants/menuItems";
import { item as itemType } from "@/constants/menuItems";
import { actionItemClick, menuItemClick } from "@/redux/slice/Menu";
import cx from "classnames";

const Menu = () => {
  const activeMenuItem = useAppSelector((state) => state.menu.active);

  const dispatch = useAppDispatch();
  const handleMenuClick = (item: itemType) => {
    dispatch(menuItemClick(item));
  };
  const handleActionItemClick = (item: itemType) => {
    dispatch(actionItemClick(item))
  };
  return (
    <div className={styles.menuWrapper}>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === menuItems.pencil,
        })}
      >
        <FontAwesomeIcon
          icon={faPencil}
          className={styles.icon}
          onClick={() => handleMenuClick(menuItems.pencil)}
        />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === menuItems.eraser,
        })}
      >
        <FontAwesomeIcon
          icon={faEraser}
          className={styles.icon}
          onClick={() => handleMenuClick(menuItems.eraser)}
        />
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon
          icon={faRotateBack}
          className={styles.icon}
          onClick={() => handleActionItemClick(menuItems.undo)}
        />
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon
          icon={faRotateForward}
          className={styles.icon}
          onClick={() => handleActionItemClick(menuItems.redo)}
        />
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon
          icon={faFileArrowDown}
          className={styles.icon}
          onClick={() => handleActionItemClick(menuItems.download)}
        />
      </div>
    </div>
  );
};

export default Menu;
