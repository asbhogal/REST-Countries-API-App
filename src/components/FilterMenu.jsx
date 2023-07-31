import { Button, Menu, MenuItem } from "@mui/material";
import useStyles from "../functions/useStyles";
import { useContext, useState } from "react";
import { CountryContext } from "../context/CountryContext";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FilterMenu({ setSelectedRegion }) {
  const classes = useStyles();
  const { regions } = useContext(CountryContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedRegionInternal, setSelectedRegionInternal] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsClicked(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsClicked(false);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegionInternal(region);
    setSelectedRegion(region);
    handleClose();
  };

  return (
    <>
      <Button
        className="filter-button"
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          ...classes.buttonStyle,
          height: "56px",
          padding: "0 20px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.50)",
        }}
      >
        {selectedRegionInternal || "FILTER BY REGION"}{" "}
        {isClicked ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Menu
        className="filter-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        {regions.map((region) => (
          <MenuItem
            key={region}
            onClick={() => {
              handleClose();
              handleRegionSelect(region);
            }}
            sx={{
              ...classes.buttonStyle,
              width: "150px",
              height: "40px",
            }}
          >
            {region}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
