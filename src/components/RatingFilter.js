import React, { useState } from 'react';

const StarCheckbox = ({ starNumber, isChecked, onCheck }) => {
    const checkedBox = (
        <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <title>checkbox-filled</title>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="drop" fill="#484747" transform="translate(64.000000, 64.000000)">
                        <path
                            d="M384,1.42108547e-14 L384,384 L1.42108547e-14,384 L1.42108547e-14,1.42108547e-14 L384,1.42108547e-14 Z M303.341465,82.7733333 L167.317333,236.793494 L98.66016,173.308288 L72.0065067,206.625365 L173.998374,296.75219 L336.658535,109.426989 L303.341465,82.7733333 Z"
                            id="Combined-Shape"
                        ></path>
                    </g>
                </g>
            </g>
        </svg>
    );

    const uncheckedBox = (
        <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <title>checkbox-component-unchecked</title>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="drop" fill="#484747" transform="translate(64.000000, 64.000000)">
                        <path
                            d="M384,1.42108547e-14 L384,384 L1.42108547e-14,384 L1.42108547e-14,1.42108547e-14 L384,1.42108547e-14 Z M362.666667,21.3333333 L21.3333333,21.3333333 L21.3333333,362.666667 L362.666667,362.666667 L362.666667,21.3333333 Z"
                            id="Combined-Shape"
                        ></path>
                    </g>
                </g>
            </g>
        </svg>
    );

    return (
        <div onClick={() => onCheck(starNumber)} style={{ cursor: 'pointer', display: 'inline-block', margin: '0 5px' }}>
            {isChecked ? checkedBox : uncheckedBox}
        </div>
    );
};


const Rating = ({onRatingChange}) => {
    const [checkedStars, setCheckedStars] = useState([]);

    const handleCheck = (starNumber) => {
        let updatedCheckedStars;
        if (checkedStars.includes(starNumber)) {
            updatedCheckedStars = checkedStars.filter((star) => star !== starNumber);
        } else {
            updatedCheckedStars = [...checkedStars, starNumber];
        }
        setCheckedStars(updatedCheckedStars);
        onRatingChange(updatedCheckedStars);
    };

    return (
        <div>
            {[5, 4, 3, 2, 1].map((starNumber) => (
                <StarCheckbox
                    key={starNumber}
                    starNumber={starNumber}
                    isChecked={checkedStars.includes(starNumber)}
                    onCheck={handleCheck}
                />
            ))}
        </div>
    );
};

export default Rating;


