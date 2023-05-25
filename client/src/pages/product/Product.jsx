import './product.scss'
import Rating from '../../components/rating/Rating'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../../slices/productsApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../slices/cartSlice'
import { useState } from 'react'
import { useCreateReviewMutation } from '../../slices/productsApiSlice'
import { toast } from 'react-toastify'

const Product = () => {
  const PF = process.env.REACT_APP_PF
  const { id } = useParams()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')

  const { userInfo } = useSelector((state) => state.auth)

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(id)

  const [
    createReview,
    { isLoading: loadingCreateReview, error: errorCreateReview },
  ] = useCreateReviewMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  const handleReview = async (e) => {
    e.preventDefault()
    try {
      await createReview({ productId: id, rating, comment }).unwrap()
      refetch()
      toast.success('Review was posted successfully')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <div className="product">
      <div className="productContainer">
        <Link to="/">
          <button className="backBtn">Go Back</button>
        </Link>
        {isLoading ? (
          <div className="">Loading...</div>
        ) : error ? (
          <div className="">{error?.data?.message || error.error}</div>
        ) : (
          <>
            <div className="productTop">
              <div className="wrapper">
                <div className="productImgContainer">
                  <img src={PF + product.image} alt="" className="productImg" />
                </div>
                <div className="productInfo">
                  <div className="productTitle">{product.name}</div>
                  <hr />
                  <Rating
                    value={product.rating}
                    text={`${product.reviews.length} reviews`}
                  />
                  <hr />
                  <div className="productPrice">$ {product.price}</div>
                  <hr />
                  <div className="productDesc">
                    <span> Description: </span>
                    <span className="desc">{product.description}</span>
                  </div>
                </div>
              </div>

              <div className="addToCart">
                <div className="addToCartContainer">
                  <div className="addToCartPrice">
                    <span>Price</span>
                    <span>{product.price}</span>
                  </div>
                  <hr />
                  <div className="addToCartStatus">
                    <span>Status</span>
                    {product.countInStock === 0 ? (
                      <span>Out of Stock</span>
                    ) : (
                      <span>In Stock</span>
                    )}
                  </div>
                  <hr />
                  <div className="addToCartQty">
                    <span>Qty</span>
                    {product.countInStock === 0 ? (
                      <div className="">-</div>
                    ) : (
                      <>
                        <select
                          name="qty"
                          id="qty"
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock)].map((_, i) => (
                            <option value={i + 1} key={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  </div>
                  <hr />
                  <button className="addToCartBtn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="productBottom">
              <div className="reviews">
                <div className="title">Reviews</div>
                {product.reviews.length === 0 && (
                  <div className="reviewItem">No Review Message</div>
                )}
                {product.reviews.map((review) => (
                  <div className="reviewItem" key={review._id}>
                    <div className="name">{review.name}</div>
                    <p>{review.comment}</p>
                    <Rating value={review.rating} />
                  </div>
                ))}
              </div>
              {userInfo ? (
                <form className="writeReview" onSubmit={handleReview}>
                  <div className="title">Write Review</div>
                  <label>Rating</label>
                  <select
                    required
                    name="rating"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                  <label>Comment</label>
                  <textarea
                    name="reivew"
                    id=""
                    placeholder="Please write a comment"
                    required
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  {loadingCreateReview && <div className="">Loading...</div>}
                  {errorCreateReview && (
                    <div className="">
                      {errorCreateReview?.data?.message ||
                        errorCreateReview.error}
                    </div>
                  )}
                  <button type="submit">Submit</button>
                </form>
              ) : (
                <div className="writeReview">
                  <div className="title">Write Review</div>
                  <span className="notLogin">
                    Please SignIn to write a review...
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default Product
