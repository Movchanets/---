import { Menu, MenuItem, Typography } from "@mui/material";
import { UserItem } from "../../../store/users/types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import InfoModal from "../modals/InfoModal";

interface MenuUserActionsProps {
  user: UserItem;
  callbackProfile: (id: number) => void;
  callbackBlock: (email: string) => void;
}

const UserMenuActions: React.FC<MenuUserActionsProps> = ({
  user,
  callbackProfile,
  callbackBlock,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [toogleDialog, setToogleDialog] = React.useState<boolean>(false);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMune = () => {
    setAnchorEl(null);
  };
  const acceptHandler = () => {
    callbackBlock(user.email);
    handleCloseMune();
  };

  const handleToogleDialog = () => {
    setToogleDialog((prev) => !prev);
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
        onClose={handleCloseMune}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={(e: any) => {
            handleCloseMune();
            callbackProfile(user.id);
          }}
        >
          Profile_Edit
        </MenuItem>
        <MenuItem
          onClick={(e: any) => {
            handleToogleDialog();
            handleCloseMune();
          }}
        >
          Block
        </MenuItem>
      </Menu>

      <InfoModal
        open={toogleDialog}
        acceptCallback={acceptHandler}
        closeDialog={handleToogleDialog}
        title={
          user.isBlocked
            ? "Розблокування користувача"
            : "Блокування користувача"
        }
        message={
          user.isBlocked
            ? `Ви впевнені , що хочете розблокувати користувача ${user.email}?`
            : `Ви впевнені , що хочете заблокувати користувача ${user.email}?`
        }
      />
    </>
  );
};

export default UserMenuActions;
