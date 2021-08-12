import CompanyListItem from './CompanyListItem';
import { useEffect, useState, FC } from 'react';
import JoblyApi from './api';
import Loading from './Loading';
import { Company } from './models';

interface CompanyListProps {
    searchParams: any
}

/**
 * Company List Component
 * Fitler companies by searchParams
 * @param {*} props {searchParams} , seachParams can contain {name , minEmployees , maxEmployees}
 * @returns 
 */
const CompanyList: FC<CompanyListProps> = ({ searchParams = {} }: CompanyListProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [companies, setCompanies] = useState<Array<Company>>([]);

    useEffect(() => {
        const getCompanies = async () => {
            setIsLoading(true);

            setCompanies(await JoblyApi.getCompanies(searchParams));

            setIsLoading(false);
        }

        getCompanies();
    }, [searchParams])

    if (isLoading) {
        return (<Loading />);
    }


    if (companies.length > 0) {
        return (
            <div>
                {companies.map(company => (
                    <CompanyListItem key={company.handle} company={company} />
                ))}
            </div>
        );
    }

    return (<div className="alert alert-danger">No company found!</div>);
}

export default CompanyList;