import { Tooltip } from "@mui/material";

const RequiredIcon = () => (
  <Tooltip
    title="* Mandatory field"
    arrow
    componentsProps={{
      tooltip: {
        sx: {
          color: "red",
        },
      },
    }}
  >
    <span
      style={{
        color: "red",
        fontSize: "16px",
        marginLeft: "4px",
      }}
    >
      *
    </span>
  </Tooltip>
);

export default RequiredIcon;
