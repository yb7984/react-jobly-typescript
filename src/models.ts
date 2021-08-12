
export interface Company {
    handle: string,
    name: string,
    description: string,
    numEmployees: bigint,
    logoUrl: string,
    jobs: Array<Job>
};

export interface User {
    username: string,
    firstName: string,
    lastName: string,
    email?: string,
    isAdmin: boolean,
    applications: Array<bigint>
};

export interface Job {
    id: bigint,
    title: string,
    salary: bigint,
    equity: bigint,
    companyHandle: string,
    companyName: string
};
