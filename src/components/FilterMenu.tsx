import { Button, Menu, MenuItem } from "@mui/material";
import useStyles from "@/functions/useStyles";
import { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { CountryContext } from "@/context/CountryContext";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterMenuProps } from "@/utils/types/menu";

export default function FilterMenu({ setSelectedRegion }: FilterMenuProps) {
  const theme = useTheme();
  const classes = useStyles();
  const { regions } = useContext(CountryContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedRegionInternal, setSelectedRegionInternal] = useState<
    null | string
  >(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsClicked(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsClicked(false);
  };

  const handleRegionSelect = (region: string) => {
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
          height: "3.5rem",
          padding: "0 1.25rem",
          boxShadow: theme.custom.boxShadow,
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
        sx={{
          mt: "2.5rem",
          "& ul": {
            padding: 0,
          },
        }}
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
              width: "9.375rem",
              height: "2.5rem",
              padding: ".625rem",
            }}
          >
            {region}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
