import routes from "./routes.tsx";
import {NavLink} from "react-router-dom";
import "../../css/Menu.css"


const Menu = () => {
    return (
        <div className={"main-menu-container"}>
            <ul className={'main-menu'}>
                {routes.map(route =>
                    (
                        <li key={route.path}>
                            <NavLink to={`/${route.path}`}>{route.label}</NavLink>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default Menu