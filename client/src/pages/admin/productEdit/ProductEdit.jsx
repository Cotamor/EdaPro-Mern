import { useEffect, useState } from 'react'
import './productEdit.scss'
// import { featuredProducts } from '../../../dummyData'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../../slices/productsApiSlice'
import { toast } from 'react-toastify'
const ProductEdit = () => {
  const { id: productId } = useParams()

  // const product = featuredProducts[0]
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId)

  const [uploadProductImage, { isLoading: loadingUpload, error: errorUpload }] =
    useUploadProductImageMutation()

  const [updateProduct, { isLoading: loadingUpdate, error: errorUpdate }] =
    useUpdateProductMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setDescription(product.description)
      setPrice(product.price)
      setCountInStock(product.countInStock)
    }
  }, [product])

  const handleFileUpload = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    console.log(e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
      console.log(image)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // TODO: Check if i need to add unwrap() or not at the end of the function below
      await updateProduct({
        productId,
        name,
        image,
        brand,
        category,
        price,
        description,
        countInStock,
      }).unwrap()
      toast.success('Product Updated')
      refetch()
      navigate('/admin/productList')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="productEdit">
      <div className="productEditContainer">
        <Link to="/admin/productList">
          <button className="goBack">Go Back</button>
        </Link>
        <div className="formContainer">
          <h1 className="title">Product Edit</h1>
          {loadingUpdate && <div className="">Loading Update...</div>}
          {errorUpdate && (
            <div className="">
              {errorUpdate?.data.message || errorUpdate.error}
            </div>
          )}
          {isLoading ? (
            <div className="">Loading...</div>
          ) : error ? (
            <div className="">{error?.data?.message || error.error}</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <label>Brand</label>
              <input
                type="text"
                placeholder="Enter brand"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              />
              <label>Price</label>
              <input
                type="number"
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <label>Count in Stock</label>
              <input
                type="number"
                placeholder="Enter countInStock"
                onChange={(e) => setCountInStock(e.target.value)}
                value={countInStock}
              />
              <label>Category</label>
              <input
                type="text"
                placeholder="Enter category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
              <label>Description</label>
              <textarea
                type="text"
                placeholder="Type description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows="3"
              />
              <label htmlFor="">Image</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input type="file" onChange={handleFileUpload} />
              {loadingUpload && <div className="">Loading...</div>}
              {errorUpload && (
                <div className="">
                  {errorUpload?.data?.message || errorUpload.error}
                </div>
              )}
              <button type="submit">Update</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
export default ProductEdit
