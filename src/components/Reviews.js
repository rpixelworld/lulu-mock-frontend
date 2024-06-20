import '../assets/css/Reviews.scss'
import {useCallback, useEffect, useState} from "react";
import Rating from "./RatingFilter";
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import * as React from 'react';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

const RatedStar = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g id="style=bulk">
                <g id="star">
                    <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd"
                          d="M14.4012 3.17499C13.8719 2.11134 13.0447 1.32715 11.9987 1.32715C10.9539 1.32715 10.1241 2.11 9.58985 3.17284L7.82915 6.69424L7.82642 6.69975C7.77359 6.8076 7.64731 6.9611 7.45702 7.10219C7.26737 7.2428 7.0834 7.31975 6.96547 7.34005L6.96441 7.34023L3.77705 7.86979C2.62694 8.06147 1.66106 8.62118 1.34801 9.6015C1.03519 10.5811 1.49663 11.597 2.31964 12.42L4.79964 14.9C4.89724 14.9976 5.0066 15.1815 5.07518 15.4211C5.14334 15.6592 5.1491 15.8751 5.11856 16.0137L5.11813 16.0156L4.40928 19.0806C4.11373 20.3578 4.21624 21.6259 5.12539 22.2893C6.03398 22.9522 7.27361 22.6647 8.40273 21.9946L11.3871 20.2279L11.389 20.2268C11.5232 20.1494 11.7443 20.0896 12.0037 20.0896C12.265 20.0896 12.4816 20.1502 12.6076 20.2249L15.5979 21.995C16.7284 22.6628 17.9695 22.9555 18.878 22.2932C19.7878 21.6299 19.8854 20.3595 19.5908 19.0812L18.8818 16.0156L18.8814 16.0137C18.8508 15.8751 18.8566 15.6592 18.9248 15.4211C18.9933 15.1815 19.1027 14.9976 19.2003 14.9L21.6785 12.4218L21.6795 12.4208C22.5077 11.5978 22.9706 10.5811 22.6552 9.60014C22.3403 8.62044 21.3726 8.06141 20.2233 7.86985L17.0333 7.33985"
                          fill="#000000"></path>
                    <path id="vector (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd"
                          d="M13.3725 16.9346C13.3726 16.9347 13.3724 16.9346 13.3725 16.9346L16.3622 18.7045C16.7186 18.9155 16.8365 19.3755 16.6255 19.7319C16.4145 20.0883 15.9545 20.2062 15.5981 19.9952L12.6081 18.2252C12.482 18.1505 12.2652 18.0898 12.0039 18.0898C11.7446 18.0898 11.5235 18.1495 11.3893 18.227L8.40219 19.9952C8.04575 20.2062 7.58575 20.0883 7.37474 19.7319C7.16374 19.3755 7.28164 18.9155 7.63808 18.7045L10.633 16.9316C11.0489 16.6896 11.547 16.5898 12.0039 16.5898C12.46 16.5898 12.9586 16.6895 13.3725 16.9346Z"
                          fill="#000000"></path>
                </g>
            </g>
        </g>
    </svg>
)
const UnratedStar = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier"
           stroke-linecap="round"
           stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g id="style=bulk">
                <g id="star">
                    <path id="vector (Stroke)"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14.4012 3.17499C13.8719 2.11134 13.0447 1.32715 11.9987 1.32715C10.9539 1.32715 10.1241 2.11 9.58985 3.17284L7.82915 6.69424L7.82642 6.69975C7.77359 6.8076 7.64731 6.9611 7.45702 7.10219C7.26737 7.2428 7.0834 7.31975 6.96547 7.34005L6.96441 7.34023L3.77705 7.86979C2.62694 8.06147 1.66106 8.62118 1.34801 9.6015C1.03519 10.5811 1.49663 11.597 2.31964 12.42L4.79964 14.9C4.89724 14.9976 5.0066 15.1815 5.07518 15.4211C5.14334 15.6592 5.1491 15.8751 5.11856 16.0137L5.11813 16.0156L4.40928 19.0806C4.11373 20.3578 4.21624 21.6259 5.12539 22.2893C6.03398 22.9522 7.27361 22.6647 8.40273 21.9946L11.3871 20.2279L11.389 20.2268C11.5232 20.1494 11.7443 20.0896 12.0037 20.0896C12.265 20.0896 12.4816 20.1502 12.6076 20.2249L15.5979 21.995C16.7284 22.6628 17.9695 22.9555 18.878 22.2932C19.7878 21.6299 19.8854 20.3595 19.5908 19.0812L18.8818 16.0156L18.8814 16.0137C18.8508 15.8751 18.8566 15.6592 18.9248 15.4211C18.9933 15.1815 19.1027 14.9976 19.2003 14.9L21.6785 12.4218L21.6795 12.4208C22.5077 11.5978 22.9706 10.5811 22.6552 9.60014C22.3403 8.62044 21.3726 8.06141 20.2233 7.86985L17.0333 7.33985"
                          fill="#BFBFBF"></path>
                    <path
                        id="vector (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd"
                        d="M13.3725 16.9346C13.3726 16.9347 13.3724 16.9346 13.3725 16.9346L16.3622 18.7045C16.7186 18.9155 16.8365 19.3755 16.6255 19.7319C16.4145 20.0883 15.9545 20.2062 15.5981 19.9952L12.6081 18.2252C12.482 18.1505 12.2652 18.0898 12.0039 18.0898C11.7446 18.0898 11.5235 18.1495 11.3893 18.227L8.40219 19.9952C8.04575 20.2062 7.58575 20.0883 7.37474 19.7319C7.16374 19.3755 7.28164 18.9155 7.63808 18.7045L10.633 16.9316C11.0489 16.6896 11.547 16.5898 12.0039 16.5898C12.46 16.5898 12.9586 16.6895 13.3725 16.9346Z"
                        fill="#bfbfbf"></path>
                </g>
            </g>
        </g>
    </svg>
)

const SearchInput = () => (
    <TextField
        className="searchInput"
        type="text"
        placeholder="Search Reviews"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
        }}
    />
);

const checkedBox = (
    <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"><title>checkbox-filled</title>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="drop" fill="#484747" transform="translate(64.000000, 64.000000)">
                    <path
                        d="M384,1.42108547e-14 L384,384 L1.42108547e-14,384 L1.42108547e-14,1.42108547e-14 L384,1.42108547e-14 Z M303.341465,82.7733333 L167.317333,236.793494 L98.66016,173.308288 L72.0065067,206.625365 L173.998374,296.75219 L336.658535,109.426989 L303.341465,82.7733333 Z"
                        id="Combined-Shape"></path>
                </g>
            </g>
        </g>
    </svg>
)

const uncheckedBox = (
    <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"><title>checkbox-component-unchecked</title>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="drop" fill="#484747" transform="translate(64.000000, 64.000000)">
                    <path
                        d="M384,1.42108547e-14 L384,384 L1.42108547e-14,384 L1.42108547e-14,1.42108547e-14 L384,1.42108547e-14 Z M362.666667,21.3333333 L21.3333333,21.3333333 L21.3333333,362.666667 L362.666667,362.666667 L362.666667,21.3333333 Z"
                        id="Combined-Shape"></path>
                </g>
            </g>
        </g>
    </svg>
)

const likedIcon = (
    <svg fill="#000000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g>
                <path
                    d="M1,15h1.8V6H1Zm12.6-9.38H10L10.64,4a3.31,3.31,0,0,0,.21-1.76A2.72,2.72,0,0,0,10.21.87,2.77,2.77,0,0,0,9.54.31,1.17,1.17,0,0,0,8.65,0,1,1,0,0,0,8,.66c-.11.29-.22.59-.34.88l-.57,1.4L4,6v9h7.11a1.82,1.82,0,0,0,1.61-1l1.94-3.68A3,3,0,0,0,15,8.94V7.07A1.42,1.42,0,0,0,13.61,5.62Z"></path>
            </g>
        </g>
    </svg>
)

const UnlikedIcon = (
    <svg fill="#000000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g>
                <path
                    d="M1,15h1.8V6H1Zm12.6-9.38H10L10.64,4a3.31,3.31,0,0,0,.21-1.76A2.72,2.72,0,0,0,10.21.87,2.77,2.77,0,0,0,9.54.31,1.17,1.17,0,0,0,8.65,0,1,1,0,0,0,8,.66c-.11.29-.22.59-.34.88l-.57,1.4L4,6v9h7.11a1.82,1.82,0,0,0,1.61-1l1.94-3.68A3,3,0,0,0,15,8.94V7.07A1.42,1.42,0,0,0,13.61,5.62Zm0,3.32a1.58,1.58,0,0,1-.18.73l-1.93,3.68a.46.46,0,0,1-.38.25H5.4v-7L8.07,3.93a1.37,1.37,0,0,0,.3-.45c.13-.29.44-1,.72-1.76a1.46,1.46,0,0,1,.26,1.7L8,7l5.6.05Z"></path>
            </g>
        </g>
    </svg>
)

export const Reviews = () => {
    const [reviewsData, setReviewData] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [displayedReviews, setDisplayedReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 16;


    useEffect(() => {
        fetch('/data/reviews.json')
            .then(res => res.json())
            .then(data => {
                setReviewData(data.reviews)
                setFilteredReviews(data.reviews)
                setDisplayedReviews(data.review.slice(0, reviewsPerPage))
                console.log("print data,", reviewsData)
            })
            .catch(error => console.error('Fetch error:', error))
    }, [])

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        const startIndex = currentPage * reviewsPerPage;
        const endIndex = startIndex + reviewsPerPage;
        setDisplayedReviews(prevReviews => [
            ...prevReviews,
            ...reviewsData.slice(startIndex, endIndex)
        ]);
        setCurrentPage(nextPage);
    };

    const handleCheckBoxClick = () => {
        setIsChecked(!isChecked)
    }

    const handleLikedIcon = () => {
        setIsLiked(!isLiked)
    }

    const handleRatingChange = useCallback((selectedRatings = []) => {
        if (selectedRatings.length === 0) {
            setFilteredReviews(reviewsData); // Show all reviews if no ratings are selected
            setDisplayedReviews(reviewsData.slice(0, currentPage * reviewsPerPage))
        } else {
            const filtered = reviewsData.filter((review) => selectedRatings.includes(review.rating));
            setFilteredReviews(filtered);
            setDisplayedReviews(filtered.slice(0, currentPage * reviewsPerPage));
        }
    },[reviewsData, currentPage, reviewsPerPage]);
    const calculateDaysAgo = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const differenceInTime = today - date;
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    };



    return (
        <div className="reviews">
            <div className="reviews-header">
                <div className="reviews-header_container">
                    <div className="reviews-header_title">
                        <div>Reviews</div>
                    </div>
                    <div className="reviews-header_average-rating-container">
                        <div className="rating-labels-container">
                        <span aria-label="3.9 out of 5 stars">3.9</span>
                            <span>
                        <div className="rating-labels" aria-label="Rated 3.9 out of 5">
                            <RatedStar/>
                            <RatedStar/>
                            <RatedStar/>
                            <RatedStar/>
                            <UnratedStar/>
                        </div></span>
                        </div>
                        <div className="reviews-header-total-reviews">Based on 21 Reviews</div>
                    </div>
                    <div className="reviews-header_fit-range-wrapper">
                        <span className="fits-true-to-size">Fits true to size</span>
                        <div className="reviews-header-fitRange">
                            <span>Smaller</span>
                            <div className="reviews-header-box-container">
                                <div className="reviews-header-tooltip">
                                    <div className="box"></div>
                                    <span aria-hidden="true" className="review-header-tooltipText">Small</span>
                                </div>
                                <div className="reviews-header-tooltip">
                                    <div className="box"></div>
                                    <span aria-hidden="true" className="review-header-tooltipText">A bit small</span>
                                </div>
                                <div className="reviews-header-tooltip">
                                    <div className="box-colored"></div>
                                    <span aria-hidden="true" className="review-header-tooltipText">True to size</span>
                                </div>
                                <div className="reviews-header-tooltip">
                                    <div className="box"></div>
                                    <span aria-hidden="true" className="review-header-tooltipText">A bit large</span>
                                </div>
                                <div className="reviews-header-tooltip">
                                    <div className="box"></div>
                                    <span aria-hidden="true" className="review-header-tooltipText">Large</span>
                                </div>
                            </div>
                            <span>Larger</span>
                        </div>
                    </div>
                    <div className="reviews-header_review-button">
                        <button>Write a review</button>
                    </div>
                </div>
            </div>
            <div className="reviews-containerRoot">
                <div className="reviews-filter">
                    <div className="reviews-filter-subheader">Filter Reviews</div>
                    <div className="reviews-filter-searchInput">
                        <SearchInput/>
                    </div>
                    <div className="reviews-filter-filterContainer">
                        <div className="reviews-filter-section-rating">
                            <div className="sectionHeading">Rating</div>
                        </div>
                        <div className="rating-review">
                            <div className="rating-checkbox-container">
                                <div className="rating-checkbox">
                                    <Rating onRatingChange={handleRatingChange}/>
                                </div>
                                <div className="labelWrapper">
                                    <div className="label">
                                        <span>5 stars</span>
                                        <span>4 stars</span>
                                        <span>3 stars</span>
                                        <span>2 stars</span>
                                        <span>1 star</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="reviews-filter-section-photos">
                            <div className="section-heading">Photos</div>
                            <div className="checkbox-container">
                                <div className="filterCheckbox" onClick={handleCheckBoxClick}>
                                    {isChecked ? checkedBox : uncheckedBox}
                                </div>
                                <div className="labelWrapper">Only show posts with images</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="reviews-containerReviews">
                    <div className="reviews-section-subheader">
                        <div className="review-container-subHeader">Showing 16 of 21 results</div>
                        <div className="review-container-sort">
                            <div className="dropdown-menu">
                                <Dropdown>
                                    <MenuButton>Sort by: </MenuButton>
                                    <div className="menu">
                                        <Menu>
                                            <MenuItem>Most Recent</MenuItem>
                                            <MenuItem>Most Helpful</MenuItem>
                                            <MenuItem>Highest to Lowest Rating</MenuItem>
                                            <MenuItem>Lowest to Highest Rating</MenuItem>
                                        </Menu>
                                    </div>

                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="reviews-section-main">
                        {displayedReviews.map(review => (
                            <div className="main-container" key={review.id}>
                                <div className="main-user">
                                    <div className="user-image">
                                        <div className="name">
                                            {review.username.slice(0, 1).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="user">{review.username}</div>
                                    <div className="time">{calculateDaysAgo(review.date)} days ago</div>
                                </div>
                                <div className="main-rating">
                                    <div className="stars">
                                        {/*{ratedStar}.repeat(review.rating)*/}
                                        {Array.from({length: review.rating}, (_, index) => (
                                            <RatedStar key={index}/>
                                        ))}
                                    </div>
                                </div>
                                <div className="main-content">
                                    <div className="content-header">{review.title}</div>
                                    <div className="content-content">{review.content}</div>
                                </div>
                                <div className="main-size">
                                    <div className="size-purchased">Size Purchased:</div>
                                    <div className="size-purchase">{review.sizePurchased}</div>
                                    <div className="fitness">Fits:</div>
                                    <div className="size-fitness">{review.fitsScale}</div>

                                </div>
                                <div className="main-card-component">
                                    <div className="liked-button" >
                                        {UnlikedIcon}
                                    </div>
                                    <div className="leave-a-comment">
                                        <div className="comment-image">
                                            <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                   stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path fill-rule="evenodd"
                                                          d="M1.75 1A1.75 1.75 0 000 2.75v9.5C0 13.216.784 14 1.75 14H3v1.543a1.457 1.457 0 002.487 1.03L8.061 14h6.189A1.75 1.75 0 0016 12.25v-9.5A1.75 1.75 0 0014.25 1H1.75zM1.5 2.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v9.5a.25.25 0 01-.25.25h-6.5a.75.75 0 00-.53.22L4.5 15.44v-2.19a.75.75 0 00-.75-.75h-2a.25.25 0 01-.25-.25v-9.5z"></path>
                                                    <path
                                                        d="M22.5 8.75a.25.25 0 00-.25-.25h-3.5a.75.75 0 010-1.5h3.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0122.25 20H21v1.543a1.457 1.457 0 01-2.487 1.03L15.939 20H10.75A1.75 1.75 0 019 18.25v-1.465a.75.75 0 011.5 0v1.465c0 .138.112.25.25.25h5.5a.75.75 0 01.53.22l2.72 2.72v-2.19a.75.75 0 01.75-.75h2a.25.25 0 00.25-.25v-9.5z"></path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="comment-word">
                                            Leave a comment
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                    {displayedReviews.length < filteredReviews.length && (
                        <div className="load-more-reviews">
                            <button onClick={handleLoadMore}>Load More Reviews</button>
                        </div>
                    )}
                </div>

            </div>

        </div>

    )
}