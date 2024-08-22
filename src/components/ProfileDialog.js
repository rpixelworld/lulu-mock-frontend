import React, { useRef, useEffect } from 'react';

const ProfileDialog = ({ isOpen, onClose, children }) => {
	const dialogRef = useRef(null);

	useEffect(() => {
		if (isOpen && dialogRef.current) {
			dialogRef.current.showModal();
		} else if (dialogRef.current) {
			dialogRef.current.close();
		}
	}, [isOpen]);

	return (
		<dialog ref={dialogRef} onClick={onClose}>
			<div onClick={e => e.stopPropagation()}>
				{children}
				<button className="btn1" onClick={onClose}>
					x
				</button>
			</div>
		</dialog>
	);
};

export default ProfileDialog;
