import "../style/Footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-ig">
                    <h3>Contact us</h3>
                    <ul>
                        <li>Work with Free Market</li>
                        <li>About us</li>
                        <li>Free Market decives</li>
                    </ul>
                </div>
                
                <div className="footer-ig">
                    <h3>Free Market Payment Products</h3>
                    <ul>
                        <li>Shop with Points</li>
                        <li>Top Up Your Balance</li>
                        <li>Free Market Currency Converter</li>
                    </ul>
                </div>
                

                <div className="footer-ig">
                    <h3>We Can Help You</h3>
                    <ul>
                        <li>Your Account</li>
                        <li>Your Orders</li>
                        <li>Help</li>
                    </ul>
                </div>
                
            </div>
            <div className="footer-bottom">
                <a href="https://portafolioanselmo.vercel.app" target="_blank"
                    rel="noopener noreferrer"><p>All rights reserved - Web Development : Anselmo Vecchio</p>
                    </a>
            </div>
        </footer>
    )
}

export default Footer;