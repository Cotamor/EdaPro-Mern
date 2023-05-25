import { useNavigate, useParams } from 'react-router-dom'
import './search.scss'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'

const Search = () => {
  const { keyword: urlKeyword } = useParams()
  const [keyword, setKeyword] = useState(urlKeyword)
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/search/${keyword}`)
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        className="searchInput"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="searchBtn" onClick={handleSearch}>
        <SearchIcon className="icon" />
      </button>
    </div>
  )
}
export default Search
