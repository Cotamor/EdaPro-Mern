import Meta from '../../components/meta/Meta'
import ProductCarousel from '../../components/productCarousel/ProductCarousel'
import './home.scss'
// import { products } from '../../dummyData'
import { Link, useParams } from 'react-router-dom'
import Rating from '../../components/rating/Rating'
import { useGetProductsQuery } from '../../slices/productsApiSlice'

const Home = () => {
  const PF = process.env.REACT_APP_PF
  const { keyword, pageNumber } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  })
  // console.log(PF)
  return (
    <div className="home">
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/">
          <button className="backBtn">Go Back</button>
        </Link>
      )}
      <div className="container">
        <Meta />
        <h1 className="productListTitle">Latest Products</h1>
        <div className="productList">
          {isLoading ? (
            'Loading...'
          ) : error ? (
            <div className="error">{error?.data?.message || error.error}</div>
          ) : (
            data.products.map((product) => (
              <div className="productListItem" key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={`${PF}${product.image}`}
                    className="productItemImg"
                    alt=""
                  />
                </Link>
                <div className="itemInfo">
                  <div className="productItemTitle">{product.name}</div>
                  <Rating
                    value={product.rating}
                    text={`${product.reviews.length} review`}
                  />

                  <div className="productItemPrice">$ {product.price}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
export default Home
