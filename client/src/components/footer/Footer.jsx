import './footer.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="copy">EdaShop &copy; {currentYear}</div>
      </div>
    </div>
  )
}
export default Footer
