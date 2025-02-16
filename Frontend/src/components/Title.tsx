import { Box, Button, Typography, Grid } from "@mui/material";
import React from "react";
import { IconButton, SxProps, Theme } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface BackArrowIconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
}

function BackArrowIconButton({ onClick, sx }: BackArrowIconButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        textTransform: "none",
        padding: "6px 0px 0px 0px",
        color: "black",
        "&:hover": {
          backgroundColor: "transparent",
        },
        ...(sx || {}),
      }}
    >
      <ArrowBackIosIcon fontSize="small" />
    </IconButton>
  );
}

interface TitleProps {
  project_name: string;
  onBack?: () => void;
  description: string[];
  handleButtonClick?: () => void;
  buttonTitle?: string;
}

const Title: React.FC<TitleProps> = ({
  onBack,
  description,
  project_name,
  buttonTitle,
  handleButtonClick,
}) => {
  return (
    <Grid
      container
      alignItems="flex-start"
      sx={{
        width: "111%",
        my: 3,
        p: 2.5,
        borderRadius: "8px",
        border: "1px solid #3333331A",
        background: "#fff",
      }}
    >
      <Grid item xs sx={{ display: "flex" }}>
        <Box>
          <Grid
            container
            item
            xs
            sx={{ display: "flex", alignItems: "flex-start" }}
          >
            {onBack && (
              <Grid
                item
                sx={{
                  width: "23px",
                  background: "#E6E6E6",
                  borderRadius: "4px",
                  mr: 0.35,
                }}
              >
                <BackArrowIconButton
                  sx={{ pl: 0.75, pb: "7px" }}
                  onClick={onBack}
                />
              </Grid>
            )}
            <Grid item>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                {project_name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              {description.map((item, index) => (
                <React.Fragment key={`${item}-${index}`}>
                  <Typography
                    variant="body2"
                    marginLeft={1}
                    color="#818181"
                    fontSize="0.75rem"
                  >
                    {item}
                  </Typography>
                  {index < description?.length - 1 && (
                    <Typography marginX={2} color="#818181">
                      |
                    </Typography>
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Grid>
        </Box>
      </Grid>

      <Grid item sx={{ marginLeft: 1 }}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          {buttonTitle}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Title;
