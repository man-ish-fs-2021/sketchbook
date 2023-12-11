import { brushColors } from "@/constants/colors";
import { menuItems } from "@/constants/menuItems";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  [menuItems.pencil]: {
    color: brushColors.black,
    size: 3,
  },
  [menuItems.eraser]: {
    color: brushColors.white,
    size: 3,
  },
  [menuItems.undo]: {},
  [menuItems.redo]: {},
  [menuItems.download]: {},
};

const ToolBoxSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state[action.payload.item].color = action.payload.color;
    },
    changeBrushSize: (state, action) => {
      state[action.payload.item].size = action.payload.size;
    },
  },
});

export const { changeColor, changeBrushSize } = ToolBoxSlice.actions;
export default ToolBoxSlice.reducer;
