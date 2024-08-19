import '../assets/css/NoIconHtmlToolTip.scss';
import { ClickAwayListener, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

export const NoIconHtmlTooltip = ({ positon, text, tooltip }) => {
	const [open, setOpen] = useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpenClose = () => {
		setOpen(prev => !prev);
	};

	return (
		<ClickAwayListener onClickAway={handleTooltipClose}>
			<Tooltip
				placement={positon}
				PopperProps={{
					disablePortal: true,
				}}
				onClose={handleTooltipClose}
				open={open}
				disableFocusListener
				disableHoverListener
				disableTouchListener
				title={
					<div className="tooltip-container" style={{whiteSpace: 'nowrap'}}>
						{tooltip}
					</div>
				}
				arrow
			>
				<Typography variant="body1" style={{ cursor: 'pointer' }} onClick={handleTooltipOpenClose}>
					{text}
				</Typography>
			</Tooltip>
		</ClickAwayListener>
	);
};
