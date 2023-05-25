import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import './productList.scss'
import { Link, useParams } from 'react-router-dom'
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../../slices/productsApiSlice'
import { toast } from 'react-toastify'

const ProductList = () => {
  const { pageNumber } = useParams()

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
  })

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation()

  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation()

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProduct(productId)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const handleCreate = async () => {
    if (window.confirm('Are you sure to create new product?')) {
      try {
        await createProduct()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className="productList">
      <div className="productListContainer">
        <div className="productListTop">
          <h1 className="title">Product List</h1>
          <button className="createBtn" onClick={() => handleCreate()}>
            Create
          </button>
        </div>
        {createLoading && <div className="">Loading...</div>}
        {deleteLoading && <div className="">Loading...</div>}
        {isLoading ? (
          <div className="">Loading...</div>
        ) : error ? (
          <div className="">{error?.data?.message || error.error}</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <EditIcon className="icon iconEdit" />
                    </Link>
                    <DeleteIcon
                      className="icon iconDelete"
                      onClick={() => handleDelete(product._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
export default ProductList
