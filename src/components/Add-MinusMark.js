import '../assets/css/Add-MinusMark.scss';
const AddedMinusMark = ({ status, style, posistion }) => {
	return (
		<div className="add-minus" style={posistion}>
			{status ? (
				<>
					<div className="move-to-vertical" style={style}></div>
					<div className="need-fix" style={style} />
				</>
			) : (
				<>
					<div className="move-to-horizontal" style={style}></div>
					<div className="need-fix" style={style} />
				</>
			)}
		</div>
	);
};
export default AddedMinusMark;
