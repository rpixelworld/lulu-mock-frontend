import '../assets/css/PicturesDialog.scss'

import {useState} from "react";
import {Dialog, DialogContent, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const PicturesDialog = ({isOpen, dialogIsClosed, title, pictures}) => {
    const [open, setOpen] = useState(true);

    const handleClose = ()=> {
        setOpen(false)
        dialogIsClosed()
    }

    return <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogContent className='picdialog-container'>
            <div className="picdialog-wrapper">
                <div className="row">
                    <button className='back-button' type='button' onClick={handleClose}>
                        <span className='arrow'>&lt;</span>&nbsp;&nbsp;<span className='text'>Back to Product</span></button>
                    <h2>{title}</h2>
                    <div className="close-icon">
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 4,
                                top: 6,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="pics-container">
                    {pictures.map(pic => <img
                        src={pic} alt=""/>
                    )}
                </div>
            </div>

        </DialogContent>
    </Dialog>
}