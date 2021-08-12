import JobSearchForm from './JobSearchForm';
import JobList from './JobList';
import useAuth from "./hooks/useAuth";
import { Redirect } from 'react-router-dom';
import { useState, FC } from 'react';


/**
 * /jobs route showing list of jobs with search
 * @returns 
 */
const Jobs: FC = () => {
    const { checkAuth } = useAuth();
    const [searchParams, setSearchParams] = useState({
        title: "",
        minSalary: "",
        hasEquity: ""
    });


    if (!checkAuth()) {
        return (<Redirect to="/login" />);
    }

    return (
        <div className="container-xl">
            <JobSearchForm searchParams={searchParams} setSearchParams={setSearchParams}></JobSearchForm>
            <JobList searchParams={searchParams}></JobList>
        </div>
    );
}

export default Jobs;