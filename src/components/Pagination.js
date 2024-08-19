import '../assets/css/Pagination.scss';

export const Pagination = ({ pagination, handleGotoPage }) => {
	let pageNumbers = [];
	let count = 0;
	for (let i = pagination.pageNo <= 3 ? 1 : pagination.pageNo - 2; i <= pagination.totalPages; i++) {
		pageNumbers.push(i);
		count++;
		if (count == 3 && pagination.totalPages - 3 > pageNumbers[0]) {
			i = pagination.totalPages - 2;
		}
	}
	return (
		<div className="pagination">
			{pagination.pageNo > 1 && (
				<>
					<buttton
						className="page"
						onClick={() => {
							handleGotoPage(1);
						}}
					>
						<ion-icon name="play-skip-back-outline"></ion-icon>
					</buttton>
					<buttton
						className="page"
						onClick={() => {
							handleGotoPage(pagination.pageNo - 1);
						}}
					>
						<ion-icon name="chevron-back-outline"></ion-icon>
					</buttton>
				</>
			)}
			{pageNumbers.map((pn, index) => (
				<>
					{index > 0 && pageNumbers[index - 1] + 1 != pageNumbers[index] && (
						<buttton className="page noborder">...</buttton>
					)}
					<buttton
						onClick={() => {
							handleGotoPage(pn);
						}}
						className={`page ${pagination.pageNo == pn ? 'current' : ''}`}
					>
						{pn}
					</buttton>
				</>
			))}
			{pagination.pageNo < pagination.totalPages && (
				<>
					<buttton
						className="page"
						onClick={() => {
							handleGotoPage(pagination.pageNo + 1);
						}}
					>
						<ion-icon name="chevron-forward-outline"></ion-icon>
					</buttton>
					<buttton
						className="page"
						onClick={() => {
							handleGotoPage(pagination.totalPages);
						}}
					>
						<ion-icon name="play-skip-forward-outline"></ion-icon>
					</buttton>
				</>
			)}
		</div>
	);
};
