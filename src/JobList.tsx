import JobListItem from "./JobListItem";
import { useEffect, useState, FC } from 'react';
import JoblyApi from './api';
import Loading from './Loading';
import { Job } from "./models";

interface JobListProps {
    searchParams?: any,
    listJobs?: Array<Job> | null
}


/**
 * Job List Component
 * Fitler jobs by searchParams if listJobs is null
 * List jobs in listJobs if listJobs is not null
 * @param {*} props {
 * searchParams : seachParams can contain {title , minSalary , hasEquity}
 * listJobs : default value is null. 
 * }
 * @returns 
 */
const JobList: FC<JobListProps> = ({ searchParams = {}, listJobs = null }: JobListProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(!listJobs);
    const [jobs, setJobs] = useState<Array<Job>>([]);

    useEffect(() => {
        const getJobs = async () => {
            setIsLoading(true);
            setJobs(await JoblyApi.getJobs(searchParams));
            setIsLoading(false);
        }
        if (listJobs === null) {
            getJobs();
        }
    }, [searchParams, listJobs])

    if (isLoading) {
        return (<Loading />);
    }

    const list: Array<Job> = listJobs || jobs;

    if (list.length > 0) {
        return (
            <div>
                {list.map(job => (
                    <JobListItem key={String(job.id)} job={job} />
                ))}
            </div>
        );
    }

    return (<div className="alert alert-danger">No job found!</div>);
}
export default JobList;