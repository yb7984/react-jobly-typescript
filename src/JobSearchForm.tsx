import useSearchFields from "./hooks/useSearchFields";
import { FC } from 'react';
interface SearchFormProps {
    searchParams: any,
    setSearchParams: any
}

/**
 * Job Search Form Component
 * handling live search for jobs
 * @param {*} props contains {searchParams , setSearchParams} 
 * @returns 
 */
const JobSearchForm: FC<SearchFormProps> = ({ searchParams, setSearchParams }: SearchFormProps) => {

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
                            id="minSalary"
                            name="minSalary"
                            onChange={handleSearchChange}
                            placeholder="Minium Salary"
                            value={formData.minSalary}
                        />
                    </div>
                    <div className="col-6">
                        <input
                            className="form-control"
                            type="search"
                            id="title"
                            name="title"
                            onChange={handleSearchChange}
                            placeholder="Search jobs here"
                            value={formData.title}
                        />
                    </div>

                    <div className="col-3 custom-control custom-switch">
                        <input
                            className="custom-control-input"
                            type="checkbox"
                            id="hasEquity"
                            name="hasEquity"
                            value="true"
                            onChange={handleSearchChange}
                        />
                        <label htmlFor="hasEquity" className="custom-control-label">Has Equity</label>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default JobSearchForm;