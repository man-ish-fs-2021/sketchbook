const menuItems = {
  pencil: "pencil",
  eraser: "eraser",
  undo: "undo",
  redo: "redo",
  download: "download",
};
type key = keyof typeof menuItems;
type item = (typeof menuItems)[key];
export { menuItems };
export type { key, item };
