import styles from "../style/Footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>
                
                <div className={styles.footerIg}>
                <h3>Contact us</h3>
                <ul>
                    <li>Work with Free Market</li>
                    <li>About us</li>
                    <li>Free Market devices</li>
                </ul>
                </div>

                <div className={styles.footerIg}>
                <h3>Free Market Payment Products</h3>
                <ul>
                    <li>Shop with Points</li>
                    <li>Top Up Your Balance</li>
                    <li>Free Market Currency Converter</li>
                </ul>
                </div>

                <div className={styles.footerIg}>
                <h3>We Can Help You</h3>
                <ul>
                    <li>Your Account</li>
                    <li>Your Orders</li>
                    <li>Help</li>
                </ul>
                </div>

            </div>

            <div className={styles.footerBottom}>
                <a
                href="https://portafolioanselmo.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                >
                <p>All rights reserved - Web Development : Anselmo Vecchio</p>
                </a>
            </div>
        </footer>
    )
}

export default Footer;