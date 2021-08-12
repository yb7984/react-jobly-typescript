import useAuth from "./hooks/useAuth";
import { Redirect, useParams } from 'react-router-dom';
import { useEffect, useState, FC } from "react";
import JoblyApi from "./api";
import Loading from "./Loading";
import JobList from "./JobList";
import { Company } from "./models";

interface ParamTypes {
    handle: string
}

/**
 * /company route, company detail page, 
 * showing company detail and jobs posted by this company
 * @returns 
 */
const CompanyDetail: FC = () => {
    const { checkAuth } = useAuth();
    const { handle } = useParams<ParamTypes>();
    const [company, setCompany] = useState<Company | null>(null);

    useEffect(() => {
        const getCompany = async (): Promise<void> => {
            const result: Company | null = await JoblyApi.getCompany(handle);

            if (result) {
                setCompany(result);
            }
        }

        getCompany();
    }, [handle]);


    if (!checkAuth()) {
        return (<Redirect to="/login" />);
    }


    if (company) {
        return (
            <div className="container-xl">
                <div className="card m-2 border-0">
                    <div className="card-body">
                        <h5 className="card-title">{company.name}</h5>
                        <div className="card-text">
                            <div className="position-relative">
                                {
                                    company.logoUrl ?
                                        <img className="float-right" src={company.logoUrl} alt={company.name} /> :
                                        ""
                                }
                                <div>Employees: {company.numEmployees}</div>
                                <div>{company.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <JobList searchParams={{}} listJobs={company.jobs} />
            </div>
        );
    }
    return (<Loading />);
}

export default CompanyDetail;