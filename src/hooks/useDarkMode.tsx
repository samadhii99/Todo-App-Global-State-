import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setDarkMode } from "../redux/todoSlice";

export const useDarkMode = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check localStorage first
    const savedDarkMode = localStorage.getItem("darkMode");

    if (savedDarkMode !== null) {
      // If we have a saved preference, use it
      const isDark = savedDarkMode === "true";
      dispatch(setDarkMode(isDark));
      applyDarkMode(isDark);
    } else {
      // Otherwise use system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      dispatch(setDarkMode(prefersDark));
      applyDarkMode(prefersDark);

      // Save this preference
      localStorage.setItem("darkMode", prefersDark.toString());
    }
  }, [dispatch]);

  const applyDarkMode = (isDark: boolean) => {
    // Set theme attribute on document
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );

    if (isDark) {
      // Professional dark theme
      const style = document.createElement("style");
      style.innerHTML = `
        body {
          background-color: #18191a !important;
          color: #e4e6eb !important;
        }
        
        /* Ant Design Drawer Components */
        .ant-drawer-content {
          background-color: #242526 !important;
        }
        .ant-drawer-header {
          background-color: #242526 !important;
          border-bottom: 1px solid #3e4042 !important;
        }
        .ant-drawer-title {
          color: #e4e6eb !important;
        }
        .ant-drawer-close {
          color: #e4e6eb !important;
        }
        
        /* Ant Design Table Components */
        .ant-table {
          background-color: #242526 !important;
          color: #e4e6eb !important;
        }
        .ant-table-thead > tr > th {
          background-color: #323436 !important;
          color: #e4e6eb !important;
          border-bottom: 1px solid #3e4042 !important;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #3e4042 !important;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: #2d2f30 !important;
        }
        
        /* Ant Design Form Components */
        .ant-form-item-label > label {
          color: #e4e6eb !important;
        }
        .ant-input {
          background-color: #3a3b3c !important;
          border-color: #3e4042 !important;
          color: #e4e6eb !important;
        }
        .ant-input:focus, .ant-input-focused {
          border-color: #4e89e8 !important;
          box-shadow: 0 0 0 2px rgba(78, 137, 232, 0.2) !important;
        }
        .ant-input::placeholder {
          color: #b0b3b8 !important;
        }
        
        /* Ant Design Select Components */
        .ant-select-selector {
          background-color: #3a3b3c !important;
          border-color: #3e4042 !important;
          color: #e4e6eb !important;
        }
        .ant-select-arrow {
          color: #e4e6eb !important;
        }
        .ant-select-dropdown {
          background-color: #3a3b3c !important;
        }
        .ant-select-item {
          color: #e4e6eb !important;
        }
        .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
          background-color: #4d4e50 !important;
        }
        .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
          background-color: #365899 !important;
          color: #e4e6eb !important;
        }
        
        /* Ant Design DatePicker Components */
        .ant-picker {
          background-color: #3a3b3c !important;
          border-color: #3e4042 !important;
        }
        .ant-picker-input > input {
          color: #e4e6eb !important;
        }
        
        /* Ant Design Button Components */
        .ant-btn {
          border-color: #3e4042 !important;
        }
        .ant-btn-default {
          background-color: #3a3b3c !important;
          color: #e4e6eb !important;
        }
        .ant-btn-primary {
          background-color: #4e89e8 !important;
          border-color: #4e89e8 !important;
          color: #ffffff !important;
        }
        .ant-btn-primary:hover, .ant-btn-primary:focus {
          background-color: #6699ec !important;
          border-color: #6699ec !important;
        }
        .ant-btn-dangerous {
          background-color: #dc3545 !important;
          border-color: #dc3545 !important;
          color: #ffffff !important;
        }
        
        /* Delete Button Icon */
        .ant-btn-dangerous .anticon {
          color: #ffffff !important;
        }
        
        /* Priority colors for todo items */
        .priority-high {
          color: #f03e3e !important;
        }
        .priority-medium {
          color: #f59f00 !important;
        }
        .priority-low {
          color: #37b24d !important;
        }
      `;

      // Remove previous style if exists
      const oldStyle = document.getElementById("dark-mode-style");
      if (oldStyle) {
        oldStyle.remove();
      }
      style.id = "dark-mode-style";
      document.head.appendChild(style);

      // Direct body styles
      document.body.style.backgroundColor = "#18191a";
      document.body.style.color = "#e4e6eb";
    } else {
      // Professional light theme
      const style = document.createElement("style");
      style.innerHTML = `
        body {
          background-color: #f5f7fa !important;
          color: #1c1e21 !important;
        }
        
        /* Ant Design Drawer Components */
        .ant-drawer-content {
          background-color: #ffffff !important;
        }
        .ant-drawer-header {
          background-color: #ffffff !important;
          border-bottom: 1px solid #e4e6eb !important;
        }
        .ant-drawer-title {
          color: #1c1e21 !important;
        }
        
        /* Ant Design Table Components */
        .ant-table {
          background-color: #ffffff !important;
          color: #1c1e21 !important;
        }
        .ant-table-thead > tr > th {
          background-color: #f5f7fa !important;
          color: #606770 !important;
          border-bottom: 1px solid #e4e6eb !important;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e4e6eb !important;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: #f5f7fa !important;
        }
        
        /* Ant Design Form Components */
        .ant-form-item-label > label {
          color: #606770 !important;
        }
        .ant-input {
          background-color: #ffffff !important;
          border-color: #dddfe2 !important;
          color: #1c1e21 !important;
        }
        .ant-input:focus, .ant-input-focused {
          border-color: #1877f2 !important;
          box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2) !important;
        }
        .ant-input::placeholder {
          color: #8d949e !important;
        }
        
        /* Ant Design Select Components */
        .ant-select-selector {
          background-color: #ffffff !important;
          border-color: #dddfe2 !important;
        }
        .ant-select-dropdown {
          background-color: #ffffff !important;
        }
        .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
          background-color: #f5f7fa !important;
        }
        .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
          background-color: #e7f3ff !important;
          color: #1877f2 !important;
        }
        
        /* Ant Design DatePicker Components */
        .ant-picker {
          background-color: #ffffff !important;
          border-color: #dddfe2 !important;
        }
        
        /* Ant Design Button Components */
        .ant-btn-default {
          background-color: #f5f7fa !important;
          border-color: #dddfe2 !important;
        }
        .ant-btn-primary {
          background-color: #1877f2 !important;
          border-color: #1877f2 !important;
        }
        .ant-btn-primary:hover, .ant-btn-primary:focus {
          background-color: #166fe5 !important;
          border-color: #166fe5 !important;
        }
        .ant-btn-dangerous {
          background-color: #dc3545 !important;
          border-color: #dc3545 !important;
          color: #ffffff !important;
        }
        
        /* Delete Button Icon - Improved visibility */
        .ant-btn-dangerous .anticon {
          color: #ffffff !important;
        }
        
        /* Priority colors for todo items */
        .priority-high {
          color: #e03131 !important;
        }
        .priority-medium {
          color: #e8590c !important;
        }
        .priority-low {
          color: #2b8a3e !important;
        }
      `;

      // Remove dark mode styles
      const darkModeStyle = document.getElementById("dark-mode-style");
      if (darkModeStyle) {
        darkModeStyle.remove();
      }

      // Add light mode styles
      style.id = "light-mode-style";
      document.head.appendChild(style);

      // Direct body styles
      document.body.style.backgroundColor = "#f5f7fa";
      document.body.style.color = "#1c1e21";
    }
  };

  return { applyDarkMode };
};
