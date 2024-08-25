import { useEffect, useState } from 'react'
import classes from './Rating.module.css'

export default function Rating(props) {
  const { rating } = props;
  // Calculate full stars, half stars, and empty stars
  const fullStars = Array.from({ length: Math.floor(rating) });
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars.length - halfStars;

  return (
    <>
      {fullStars.map((_, index) => (
        <i key={`full-${index}`} className={`fas fa-star`}></i>
      ))}
      {halfStars === 1 && <i className={`fas fa-star-half-alt`}></i>}
      {emptyStars > 0 && Array.from({ length: emptyStars }).map((_, index) => (
        <i key={`empty-${index}`} className={`far fa-star`}></i>
      ))}
    </>
  )
}
