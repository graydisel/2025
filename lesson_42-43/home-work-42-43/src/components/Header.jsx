import {Link, NavLink} from 'react-router'
import routes from '../routes.jsx'
import {useState} from "react";

const Header = () => {
    const [selectData, setSelectData] = useState('')
    const HandleChange = (e) => {
        setSelectData(e.target.value);
        console.log(e.target.value);
    }
    return (
        <div className="header-container">
            <div className={'information-header'}>
                <img className={'logo'} src={'public/logo.svg'} alt="logo" />
                <h1>Welcome on "Beer Hut"</h1>
                <div>
                    <label htmlFor="country">Choose the country</label>
                    <select name="country" id="country" onChange={HandleChange}>
                        <option value="-" disabled={true}>---</option>
                        <option value="ukraine">Ukraine</option>
                        <option value="usa">USA</option>
                        <option value="england">England</option>
                    </select>
                </div>
            </div>
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