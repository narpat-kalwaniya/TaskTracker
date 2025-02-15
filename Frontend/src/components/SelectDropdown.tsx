import React from "react";
import {
  TextField,
  MenuItem,
  Box,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RequiredIcon from "./RequiredIcons";

type menuOptions = {
  label: string;
  value: string;
};
interface SelectDropdownProps {
  menuOptions: menuOptions[];
  placeholder: string;
  handleChange: (selectedOption: string) => void;
  label?: string;
  labelPad?: string;
  width: string;
  selectedValue: string;
  pad?: number;
  padY?: number;
  isLoading?: boolean;
  disable?: boolean;
  isFirst?: boolean;
  labelFontSize?: string;
  tooltipTitle?: string;
  required?: boolean;
  inline?: boolean;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  menuOptions,
  placeholder,
  label,
  labelPad = "10px",
  width,
  selectedValue,
  handleChange,
  disable,
  isLoading,
  required,
  pad = 2,
  padY = 2,
  isFirst,
  labelFontSize = "14px",
  tooltipTitle,
  inline,
}) => {
  const handleOptionSelection = (value: string) => {
    if (selectedValue === value) {
      handleChange("");
    } else {
      handleChange(value);
    }
  };

  const StyledArrowDown = styled(KeyboardArrowDown)({
    fontSize: "small",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: inline ? "row" : "column",
        alignItems: "left",
        paddingTop: label ? padY : 0,
        paddingBottom: label ? padY : 0,
        paddingRight: label ? pad : 0,
        paddingLeft: isFirst ? 2 : pad,
      }}
    >
      {label && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: labelPad,
            marginBottom: inline ? "0px" : "8px",
          }}
        >
          <Typography
            sx={{
              marginRight: tooltipTitle ? "4px" : "0px",
              fontWeight: "500",
              fontSize: labelFontSize,
              color: "#312E2D",
            }}
          >
            {label}
          </Typography>

          {tooltipTitle && (
            <Tooltip
              arrow
              placement="top-start"
              sx={{ boxShadow: "inherit" }}
              title={tooltipTitle}
            >
              <InfoOutlinedIcon fontSize="small" sx={{ width: "0.8rem" }} />
            </Tooltip>
          )}
          {required && <RequiredIcon />}
        </Box>
      )}

      <TextField
        select
        value={selectedValue}
        disabled={disable}
        variant="outlined"
        sx={{
          width,
          background: "#fff",
          borderRadius: "4px",
          "& .MuiSelect-select": {
            fontSize: "12px",
            paddingTop: "2px",
          },
        }}
        SelectProps={{
          displayEmpty: true,
          IconComponent: StyledArrowDown,
          MenuProps: { PaperProps: { style: { maxHeight: 450 } } },
          renderValue: (value) => {
            if (value === "") {
              return (
                <span style={{ color: "#25252539", fontSize: "12px" }}>
                  {placeholder}
                </span>
              );
            }
            return menuOptions?.find((option) => option.value === value)?.label;
          },
        }}
      >
        {menuOptions?.map((option, index) => (
          <MenuItem
            key={String(option?.value + index)}
            value={option?.value}
            sx={{ fontSize: "12px" }}
            onClick={() => handleOptionSelection(option?.value)}
          >
            {option?.label}
          </MenuItem>
        ))}
        {isLoading && (
          <MenuItem sx={{ alignContent: "center" }}>
            <CircularProgress size={15} sx={{ color: "primary" }} />
          </MenuItem>
        )}
      </TextField>
    </Box>
  );
};

export default SelectDropdown;
