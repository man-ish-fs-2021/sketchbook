"use client";
import React from "react";
import styles from "./index.module.css";
import { brushColors } from "@/constants/colors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { menuItems } from "@/constants/menuItems";
import { changeBrushSize, changeColor } from "@/redux/slice/Toolbox";
import cx from "classnames";
import { socket } from "@/utils/socket";

const Toolbox = () => {
  const dispatch = useAppDispatch();
  const activeMenuItem = useAppSelector((state) => state.menu.active);
  const { color , size} = useAppSelector((state) => state.toolbox[activeMenuItem]);
  console.log("toolbox",{color, activeMenuItem})
  const showColor = activeMenuItem === menuItems.pencil;
  const showBrush =
    activeMenuItem === menuItems.pencil || activeMenuItem === menuItems.eraser;
  const updateSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = e.target.value
    dispatch(
      changeBrushSize({
        item: activeMenuItem,
        size: e.target.value,
      })
    );
    socket.emit('changeConfig', {color, size: e.target.value})
  };
  const updateColor = (color: string) => {
    dispatch(changeColor({item: activeMenuItem, color}));
    socket.emit('changeConfig', {color, size})

  };
  return (
    <div className={styles.toolboxContainer}>
      {showColor && (
        <div className={styles.tool}>
          <h4 className={styles.heading}>Stroke</h4>
          <div className={styles.itemContainer}>
            {Object.values(brushColors).map((backgroundColor) => (
              <div
                key={backgroundColor}
                className={cx(styles.colorBox, {
                  [styles.active]: backgroundColor === color,
                })}
                style={{ backgroundColor }}
                onClick={() => updateColor(backgroundColor)}
              />
            ))}
          </div>
        </div>
      )}
      {showBrush && (
        <div className={styles.tool}>
          <h4 className={styles.heading}>Brush size {activeMenuItem}</h4>
          <div className={styles.itemContainer}>
            <input
              className={styles.brushSize}
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={updateSize}
              value={size}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbox;
