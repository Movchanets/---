import { Menu, MenuItem, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import RemoveModal from "../modals/RemoveModal";
import { IProductItem } from "../../../store/products/types";

interface MenuProductActionsProps {
  product: IProductItem;
  editFunc: (id: number) => void;
  removeFunc: (id: number) => void;
}

const ProductMenuActions: React.FC<MenuProductActionsProps> = ({
  product,
  editFunc,
  removeFunc,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          color: "black",
          cursor: "pointer",
          width: "fit-content",
          margin: "auto",
        }}
        onClick={handleClickMenu}
      >
        <MoreHorizIcon />
      </Typography>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            editFunc(product.id);
          }}
        >
          Edit
        </MenuItem>

        {/* Modal remove */}
        <RemoveModal
          id={product.id}
          description={"Are you sure about removing product: " + product.name}
          closeMenu={handleCloseMenu}
          removeFunc={removeFunc}
        ></RemoveModal>
      </Menu>
    </>
  );
};

export default ProductMenuActions;
