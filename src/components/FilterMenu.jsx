import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import useStyles from "../functions/useStyles";
import { useContext, useState } from "react";
import { CountryContext } from "../context/CountryContext";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FilterMenu({ setSelectedRegion }) {
  const theme = useTheme();
  const classes = useStyles();
  const { regions } = useContext(CountryContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsClicked(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsClicked(false);
  };

  return (
    <>
      <Button
        className="filter-button"
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={classes.buttonStyle}
      >
        FILTER BY REGION {isClicked ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Menu
        className="filter-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        {regions.map((region) => (
          <MenuItem key={region} onClick={() => setSelectedRegion(region)}>
            {region}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
