import { menuItems } from "@/constants/menuItems";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: menuItems.pencil,
  actionMenuItem: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {
    menuItemClick: (state, action) => {
      state.active = action.payload;
    },
    actionItemClick: (state, action) => {
      state.actionMenuItem = action.payload;
    },
  },
});

export const { menuItemClick, actionItemClick } = menuSlice.actions;
export default menuSlice.reducer;
