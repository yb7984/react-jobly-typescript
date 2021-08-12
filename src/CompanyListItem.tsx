import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Company } from './models';

interface CompanyListItemProps {
    company: Company
}

/**
 * Company List Item Component
 * @param {*} props contains {company} 
 * @returns 
 */
const CompanyListItem: FC<CompanyListItemProps> = ({ company }: CompanyListItemProps) => {
    return (
        <div className="card m-2">
            <div className="card-body">
                <h5 className="card-title"><Link to={`/companies/${company.handle}`}>{company.name}</Link></h5>
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
    );
}

export default CompanyListItem;