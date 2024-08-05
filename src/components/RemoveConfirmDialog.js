import "../assets/css/RemoveConfirmDialog.scss";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";

export const RemoveConfirmDialog = ({
  isOpen,
  itemKey,
  handleRemove,
  handleClose,
}) => {
  return (
    <Dialog fullScreen={false} open={isOpen}>
      <DialogContent className="remove-confirm-dialog-container">
        <h1>Are you sure you want to remove this item from your bag?</h1>
        <button
          type="button"
          className="confirm"
          onClick={() => {
            handleRemove(itemKey);
          }}
        >
          yes, remove this item
        </button>
        <div className="no">
          <span onClick={handleClose}>No, keep this item</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
