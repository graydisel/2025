import "../css/Product.css"
import {useContext} from "react";
import {CountryContext} from "./CountryContext.jsx";

const Products = () => {
    document.title = 'Contact';
    const { country } = useContext(CountryContext);

    const allProducts = [
        {
            name: "Straight Up",
            countries: ["England"],
            image: "src/assets/product-images/straight-up.jpeg",
        },
        {
            name: "Blanc",
            countries: ["England", "USA"],
            image: "src/assets/product-images/blanc.jpeg",
        },
        {
            name: "Glassware",
            countries: ["England", "USA"],
            image: "src/assets/product-images/glassware.jpeg",
        },
        {
            name: "Chocolate Slates",
            countries: ["USA"],
            image: "src/assets/product-images/chocolate.jpeg",
        }
    ];
    const filteredProducts = allProducts.filter(product => product.countries.includes(country));
    return (
        <div className={'products-container'}>
            <h2>Available products</h2>
            {filteredProducts.length > 0 ? (
            <div className={"list-products"}>
                {filteredProducts.map((product) => (
                    <div key={product.name}>
                        <img className={'image-product'} src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                    </div>
                ))}
            </div>
            ) : (country !== '-') ? (
                <p>Unfortunately, we do not deliver any products to {country}.</p>
            ) : (
                <p>Choose your country</p>
            )}
        </div>
    )
}

export default Products