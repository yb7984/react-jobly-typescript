import CompanySearchForm from './CompanySearchForm';
import CompanyList from './CompanyList';
import useAuth from "./hooks/useAuth";
import { Redirect } from 'react-router-dom';
import { useState, FC } from 'react';

/**
 * /companies route showing list of companies with search
 * @returns 
 */
const Companies: FC = () => {
    const checkAuth = useAuth().checkAuth;
    const [searchParams, setSearchParams] = useState<any>({
        name: "",
        minEmployees: "",
        maxEmployees: ""
    });
    if (!checkAuth()) {
        return (<Redirect to="/login" />);
    }
    return (
        <div className="container-xl">
            <CompanySearchForm searchParams={searchParams} setSearchParams={setSearchParams}></CompanySearchForm>
            <CompanyList searchParams={searchParams} ></CompanyList>
        </div>
    );
}

export default Companies;