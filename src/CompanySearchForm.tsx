import { FC } from "react";
import useSearchFields from "./hooks/useSearchFields";

interface SearchFormProps {
    searchParams: any,
    setSearchParams: any
}

/**
 * Company Search Form Component
 * handling live search for companies
 * @param {*} props contains {searchParams , setSearchParams} 
 * @returns 
 */
const CompanySearchForm: FC<SearchFormProps> = ({ searchParams, setSearchParams }: SearchFormProps) => {

    const [formData, handleSearchChange, handleSubmit] = useSearchFields(
        searchParams,
        setSearchParams
    );

    return (
        <div className="container p-1">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-3">
                        <input
                            className="form-control"
                            type="number"
                            id="minEmployees"
                            name="minEmployees"
                            onChange={handleSearchChange}
                            placeholder="Minium Employees"
                            value={formData.minEmployees}
                        />
                    </div>
                    <div className="col-3">
                        <input
                            className="form-control"
                            type="number"
                            id="maxEmployees"
                            name="maxEmployees"
                            onChange={handleSearchChange}
                            placeholder="Maxium Employees"
                            value={formData.maxEmployees}
                        />
                    </div>
                    <div className="col-6">
                        <input
                            className="form-control"
                            type="search"
                            id="name"
                            name="name"
                            onChange={handleSearchChange}
                            placeholder="Search companies here"
                            value={formData.name}
                        /></div>
                </div>
            </form>
        </div>
    );
}

export default CompanySearchForm;