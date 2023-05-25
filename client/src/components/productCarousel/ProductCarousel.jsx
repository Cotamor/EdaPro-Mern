import './productCarousel.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useGetTopProductsQuery } from '../../slices/productsApiSlice'
// import { Link } from 'react-router-dom'
const ProductCarousel = () => {
  const PF = process.env.REACT_APP_PF
  const [sliderIndex, setSliderIndex] = useState(1)
  const { data: topProducts, isLoading, error } = useGetTopProductsQuery()

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : 2)
    } else {
      setSliderIndex(sliderIndex < 2 ? sliderIndex + 1 : 0)
    }
  }

  return (
    <div className="productCarousel">
      {isLoading ? (
        <div className="">Loading...</div>
      ) : error ? (
        <div className="">{error?.data?.message || error.error}</div>
      ) : (
        <>
          <div className="arrows leftArrow" onClick={() => handleClick('left')}>
            <ArrowBackIcon className="icon" />
          </div>
          <div
            className="wrapper"
            style={{ transform: `translateX(-${sliderIndex * 100}vw)` }}
          >
            {topProducts.map((product, i) => (
              <div className={`slide slide${i + 1}`} key={product._id}>
                <div className="imgContainer">
                  <img src={PF + product.image} alt="" />
                </div>
                <div className="infoContainer">
                  <div className="title">{product.name}</div>
                  <div className="desc">
                    {product.description.slice(0, 100) + '...'}
                  </div>
                  <Link to={`/product/${product._id}`}>
                    <button>Buy Now</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="arrows rightArrow">
            <ArrowForwardIcon
              className="icon"
              onClick={() => handleClick('right')}
            />
          </div>
        </>
      )}
    </div>
  )
}
export default ProductCarousel
