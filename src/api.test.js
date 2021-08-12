import { localStorageMock, testToken } from './_testCommon';
import JoblyApi from './api';
import axiosMock from 'axios';

window.localStorage = localStorageMock;

beforeEach(() => {
    // JoblyApi.token = null;
});

afterEach(() => {
    JoblyApi.token = null;
});

describe("token", function () {
    it('works get token and getCurrentUser', async () => {

        expect(localStorage.getItem("_token")).toEqual(null);
        expect(JoblyApi.token).toEqual("");

        let user = await JoblyApi.getCurrentUser();
        expect(user).toEqual(null);

        JoblyApi.token = testToken;

        expect(JoblyApi.token).toEqual(testToken);
        expect(localStorage.getItem("_token")).toEqual(testToken);


        const data = {
            status: 200,
            data: {
                user: {
                    username: "testuser",
                    firstName: "test_f",
                    lastName: "test_l",
                    isAdmin: true,
                    applications: []
                }
            },
        };

        axiosMock.mockResolvedValueOnce(data);

        user = await JoblyApi.getCurrentUser();
        expect(user).not.toEqual(null);
        expect(user).toEqual({
            username: "testuser",
            firstName: "test_f",
            lastName: "test_l",
            isAdmin: true,
            applications: []
        });
    });
});
