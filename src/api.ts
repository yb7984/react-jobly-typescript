import axios, { AxiosRequestConfig, Method } from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Company, User, Job } from "./models";

const BASE_URL: string = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static _token: string = "";

  /**
   * getter of toke, if not available check the localStorage
   */
  static get token(): string {
    if (JoblyApi._token === "") {
      //check the localStorage
      JoblyApi._token = localStorage.getItem("_token") ? String(localStorage.getItem("_token")) : "";
    }
    return JoblyApi._token;
  }

  static set token(t: string) {
    if (t !== null) {
      localStorage.setItem("_token", t);
    } else {
      localStorage.setItem("_token", "");
    }

    JoblyApi._token = t;
  }

  static async request(endpoint: string, data: any = {}, method: Method = "get"): Promise<any> {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url: string = `${BASE_URL}/${endpoint}`;
    const headers: Object = { Authorization: `Bearer ${JoblyApi.token}` };
    const params: Object = (method === "get")
      ? data
      : {};

    try {
      const config: AxiosRequestConfig = { url, method, data, params, headers };
      return (await axios(config)).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message: string | Array<string> = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  /**
   * Get Current User Information
   * 
   * Returns { username, firstName, lastName, isAdmin, applications }
   *   where applications is [jobId , ...]
   */
  static async getCurrentUser(): Promise<User | null> {

    if (JoblyApi.token === "") {
      return null;
    }

    try {
      const payload: string | JwtPayload | null = jwt.decode(JoblyApi.token);

      const username: string = payload && typeof payload !== "string" && payload["username"];

      if (username) {
        return await JoblyApi.getUser(username);
      }
    } catch (error) {
      console.error(error);
    }

    return null;
  }


  /** GET company list
   *   [ { handle, name, description, numEmployees, logoUrl }, ...]
   *
   * Can filter on provided search filters:
   * - minEmployees
   * - maxEmployees
   * - name (will find case-insensitive, partial matches)
   */

  static async getCompanies(searchParams: any = {}): Promise<Array<Company>> {

    const params: any = { ...searchParams };
    if (!params["name"]) {
      delete params["name"];
    }

    if (!params.minEmployees || parseInt(params.minEmployees) < 0) {
      delete params.minEmployees
    }

    if (!params.maxEmployees || parseInt(params.maxEmployees) < 0) {
      delete params.maxEmployees
    }

    if (
      params.minEmployees &&
      params.maxEmployees &&
      parseInt(params.minEmployees) > parseInt(params.maxEmployees)
    ) {
      return [];
    }

    const res: any = await this.request(`companies`, params);
    return res.companies;
  }
  /** Get details on a company by handle. */

  static async getCompany(handle: string): Promise<Company | null> {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }


  /** GET / =>
   *   [ { id, title, salary, equity, companyHandle, companyName }, ...]
   *
   * Can provide search filter in query:
   * - minSalary
   * - hasEquity (true returns only jobs with equity > 0, other values ignored)
   * - title (will find case-insensitive, partial matches)
   */

  static async getJobs(searchParams: any = {}): Promise<Array<Job>> {

    const params: any = { ...searchParams };
    if (!params.title) {
      delete params.title;
    }

    if (!params.minSalary || parseInt(params.minSalary) <= 0) {
      delete params.minSalary
    }

    let res = await this.request(`jobs`, params);
    return res.jobs;
  }


  /** GET user infomation
   *
   * Returns { username, firstName, lastName, isAdmin, applications }
   *   where applications is [jobId , ...]
   **/
  static async getUser(username: string): Promise<User> {
    let res: any = await this.request(`users/${username}`);
    return res.user;
  }

  /**
   * Update user information
   * @param {*} user Data can include:
   *   { firstName, lastName, password, email }
   * @returns { username, firstName, lastName, email, isAdmin }
   */
  static async updateUser(user: User): Promise<any> {
    const data: any = { ...user };
    delete data.username;

    let res = await this.request(`users/${user.username}`, data, 'patch');

    return res;
  }

  /** Apply for Job
   *
   * Returns {"applied": jobId}
   * */
  static async applyToJob(username: string, jobId: bigint): Promise<any> {
    return await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }

  /** Login and return true or error message
   *
   * Returns JWT token which can be used to authenticate further requests.
   */
  static async login(username: string, password: string): Promise<any> {
    try {
      const res: any = await this.request(`auth/token`, { username, password }, "post");

      if (res.token) {
        JoblyApi.token = res.token;
        return true;
      }
    } catch (error: any) {
      console.error(error);
    }

    JoblyApi.token = "";
    return false;
  }

  /** Register and return true or error message
   *
   * user must include { username, password, firstName, lastName, email }
   *
   * Returns JWT token which can be used to authenticate further requests.
   */
  static async register(user: User): Promise<any> {
    let res = await this.request(`auth/register`, user, "post");

    if (res.token) {
      JoblyApi.token = res.token;
      return true;
    } else {
      return res;
    }
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
