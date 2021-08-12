import { useContext, FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import JoblyApi from './api';
import UserContext from './context/userContext';
import { Job, User } from './models';

interface JobListItemProps {
    job: Job,
    showCompany?: boolean
};

/**
 * Job List Item Component
 * @param {*} props contains {
 * job : job information 
 * showCompany : default value is true. toggle for showing company information or not} 
 * @returns 
 */
const JobListItem: FC<JobListItemProps> = ({ job, showCompany = true }: JobListItemProps) => {
    const { loginUser, setLoginUser } = useContext(UserContext);

    const isApplied: boolean = loginUser ? loginUser.applications.includes(job.id) : false;

    const handleApply: MouseEventHandler = async (): Promise<void> => {
        const result = await JoblyApi.applyToJob(loginUser ? loginUser.username : "", job.id);

        if (result.applied) {
            setLoginUser((user: User) => ({
                ...user,
                applications: [
                    ...user.applications,
                    result.applied
                ]
            }));
        }
    };

    return (
        <div className="card m-2">
            <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <div className="card-text">
                    {showCompany ? (<div><Link to={`/companies/${job.companyHandle}`}>{job.companyName}</Link></div>) : ""}
                    <div className="row">
                        <div className="col-12 col-md-5">Salary:{job.salary}</div>
                        <div className="col-12 col-md-5">Equity:{job.equity}</div>
                        <div className="col-12 col-md-2 text-center">
                            <button className="btn btn-success btn-lg" onClick={handleApply} disabled={isApplied}>
                                {isApplied ? "Applied" : "Apply"}
                            </button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobListItem;