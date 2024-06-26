import '../assets/css/HtmlToolTip.scss'
import {ClickAwayListener, Tooltip} from "@mui/material";
import tooltip from "../assets/images/tooltip.png";
import {useState} from "react";


export const HtmlTooltip = ({positon, content}) => {

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
                <div className='tooltip-container'>
                    {content}
                    {/*We offer Free Standard Shipping on all orders within Canada. Shipping can be expedited in checkout.*/}
                </div>
                }
                arrow
            >
                <img className='tooltip' onClick={handleTooltipOpenClose} src={tooltip} alt=""/>
            </Tooltip>
        </ClickAwayListener>
    );
};