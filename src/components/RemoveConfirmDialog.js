import '../assets/css/RemoveConfirmDialog.scss';
import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';

export const RemoveConfirmDialog = ({ confirmMessage, yesMessage, noMessage, isOpen, itemKey, handleRemove, handleClose }) => {
	return (
		<Dialog fullScreen={false} open={isOpen}>
			<DialogContent className="remove-confirm-dialog-container">
				<h1>{confirmMessage}</h1>
				<button
					type="button"
					className="confirm"
					onClick={() => {
						handleRemove(itemKey);
					}}
				>
					{yesMessage}
				</button>
				<div className="no">
					<span onClick={handleClose}>{noMessage}</span>
				</div>
			</DialogContent>
		</Dialog>
	);
};
