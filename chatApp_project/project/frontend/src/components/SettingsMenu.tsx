import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";

type SettingsMenuProps = {
  hidden: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
};

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  hidden,
  handleEdit,
  handleDelete
}) => {
  const [anchorEl, setAnchorEl]: [null | HTMLElement, any] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAction = (customHandler: () => void) => {
    customHandler();
    handleClose();
  };
  return (
    <React.Fragment>
      <IconButton hidden={hidden} aria-label="settings" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={() => handleAction(handleEdit)}>
          <EditIcon fontSize="small" />
          &nbsp;Edit
        </MenuItem>
        <MenuItem onClick={() => handleAction(handleDelete)}>
          <DeleteIcon fontSize="small" />
          &nbsp;Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
