import {NavLink} from 'react-router'
import routes from '../routes.tsx'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/types.ts'
import { setCountry } from '../redux/features/countrySlice';
import * as React from "react";

const Header = () => {
    const country = useSelector((state: RootState) => state.country.value);
    const dispatch: AppDispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCountry(e.target.value));
    }
    return (
        <div className="header-container">
            <div className={'information-header'}>
                <img className={'logo'} src={'public/logo.svg'} alt="logo" />
                <h1>Welcome on "Beer Hut"</h1>
                <div>
                    <label htmlFor="country">Choose the country</label>
                    <select name="country" id="country" value={country} onChange={handleChange}>
                        <option value="-" disabled={true}>---</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="USA">USA</option>
                        <option value="England">England</option>
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