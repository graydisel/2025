import routes from "../routes.tsx";
import {NavLink} from "react-router";
import '../css/Header.css'

const Header = () => {
    return (
        <div className={'header-container'}>
        <h1 className={'app-header'}>News Library</h1>
            <ul className={'header-menu'}>
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

export default Header