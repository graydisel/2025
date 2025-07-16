import "../../css/Header.css"

const Header = () => {
    return (
        <header>
            <div className={"logo-container"}>
                <img className={"header-logo"} src="./src/assets/images/logo.svg" alt="Logo"/>
                <img className={"header-logo-name"} src="./src/assets/images/logo_name.svg" alt="Logo Name"/>
            </div>
            <img className={"header-image"} src="./src/assets/images/header/bookshelf.svg" alt="Bookshelf" />
        </header>
    )
}

export default Header