import StarIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import './rating.scss'

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <StarIcon />
        ) : value >= 0.5 ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <StarIcon />
        ) : value >= 1.5 ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <StarIcon />
        ) : value >= 2.5 ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <StarIcon />
        ) : value >= 3.5 ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <StarIcon />
        ) : value >= 4.5 ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </span>
      <span className="rating-text">{text && text}</span>
      {/* <div className="ratingIcons">
        <StarIcon className="starIcon" />
        <StarIcon className="starIcon" />
        <StarIcon className="starIcon" />
      </div>
      <span>12 ratings</span> */}
    </div>
  )
}
export default Rating
