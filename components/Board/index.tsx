"use client";
import { menuItems } from "@/constants/menuItems";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { actionItemClick } from "@/redux/slice/Menu";
import React, { useEffect, useLayoutEffect, useRef } from "react";

import { socket } from "../../utils/socket";

const Board = () => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawHistory = useRef<ImageData[]>([]);
  const pointer = useRef(0);
  const shouldDraw = useRef(false);
  const activeMenuItem = useAppSelector((state) => state.menu.active);
  const actionMenuItem = useAppSelector((state) => state.menu.actionMenuItem);
  const { color, size } = useAppSelector(
    (state) => state.toolbox[activeMenuItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (actionMenuItem === menuItems.download) {
      const url = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "sketch.jpg";
      anchor.click();
    }
    if (actionMenuItem === menuItems.undo) {
      if (pointer.current > 0) {
        pointer.current -= 1;
      }
      const imageData = drawHistory.current[pointer.current];
      ctx?.putImageData(imageData, 0, 0);
    }
    if (actionMenuItem === menuItems.redo) {
      if (pointer.current < drawHistory.current.length-1) {
        pointer.current += 1;
      }
      const imageData = drawHistory.current[pointer.current];
      ctx?.putImageData(imageData, 0, 0);
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const changeConfig = (color: string, size: number) => {
      ctx.strokeStyle = color || "black";
      ctx.lineWidth = size || 0;
    };
    const handleChangeConfig = (config: any) => {
      changeConfig(config.color, config.size);
    };

    changeConfig(color || "black", size || 0);
    socket.on("changeConfig", handleChangeConfig);
    return () => {
      socket.off("changeConfig", handleChangeConfig);
    };
  }, [color, size]);
  // before repaint
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const beginPath = (x: number, y: number) => {
      ctx?.beginPath();
      ctx?.moveTo(x, y);
    };
    const drawLine = (x: number, y: number) => {
      ctx?.lineTo(x, y);
      ctx?.stroke();
    };
    const handleMouseDown = (e: MouseEvent) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
      socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
      socket.emit("drawLine", { x: e.clientX, y: e.clientY });
    };
    const handleMouseUp = () => {
      shouldDraw.current = false;
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!drawHistory.current || !imageData) return;
      drawHistory.current.push(imageData);
      pointer.current = drawHistory.current.length - 1;
    };
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      console.log("client connected"); // x8WIv7-mJelg7on_ALbx
    });
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    const handleBeginPath = (path: any) => {
      beginPath(path.x, path.y);
    };
    const handleDrawLine = (path: any) => {
      drawLine(path.x, path.y);
    };
    socket.on("beginPath", handleBeginPath);
    socket.on("drawLine", handleDrawLine);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      socket.off("beginPath", handleBeginPath);
      socket.off("drawLine", handleDrawLine);
    };
  }, []);
  console.log({ color, size });
  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
