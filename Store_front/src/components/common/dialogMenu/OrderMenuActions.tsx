import { Menu, MenuItem, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import RemoveModal from "../modals/RemoveModal";
import { IOrderItem } from '../../../store/orders/types';




interface MenuOrderActionsProps {
  order: IOrderItem | undefined;
 
  removeFunc: (id: number) => void;

}

const OrderMenuActions: React.FC<MenuOrderActionsProps> = ({
  order,
  
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
      

        {/* Modal remove */}
        <RemoveModal
          id={order?.id ?? 0}
          description={"Are you sure about removing order: " + order?.id}
          closeMenu={handleCloseMenu}
          removeFunc={removeFunc}
        ></RemoveModal>
      </Menu>
    </>
  );
};

export default OrderMenuActions;
