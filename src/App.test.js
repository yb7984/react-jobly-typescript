import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import axiosMock from 'axios';
import { localStorageMock, testCompany, testToken, testUser, testJob } from './_testCommon';
import JoblyApi from './api';

console.error = jest.fn((msg) => {
  console.log(msg);
});

window.localStorage = localStorageMock;

beforeEach(() => {
});

afterEach(() => {
  JoblyApi.token = "";
});

test('renders page without login', () => {
  JoblyApi.token = "";

  render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
  render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
  render(<MemoryRouter initialEntries={['/signup']}><App /></MemoryRouter>);
});


test('test login', async () => {
  JoblyApi.token = "";

  axiosMock.mockImplementation(({ url }) => {
    if (url.indexOf("/token") !== -1) {
      return {
        status: 200,
        data: {
          token: testToken
        }
      };
    }

    if (url.indexOf("/users") !== -1) {
      return {
        status: 200,
        data: {
          user: { ...testUser }
        }
      };
    }

  });
  const { asFragment, findByText, getByText, getByPlaceholderText } = render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);

  expect(asFragment()).toMatchSnapshot();

  expect(getByPlaceholderText("Enter username")).toBeInTheDocument();

  fireEvent.change(getByPlaceholderText("Enter username"), { target: { value: "test" } });
  fireEvent.change(getByPlaceholderText("Enter password"), { target: { value: "password" } });

  //login
  fireEvent.click(getByText("Login"));

  await findByText("Companies");

  expect(getByText("Welcome back", { exact: false })).toBeInTheDocument();

});


test('/companies /jobs match a snapshot, works with login', async () => {

  JoblyApi.token = testToken;

  const data = {
    status: 200,
    data: {
      user: {
        ...testUser
      }
    },
  };

  axiosMock.mockResolvedValueOnce(data);
  axiosMock.mockRejectedValue({
    data: {
      error: {
        message: "error"
      }
    }
  })

  const { asFragment, getByTestId, getByText, findByText, findByPlaceholderText } = render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);

  expect(asFragment()).toMatchSnapshot();

  expect(getByTestId("loading")).toBeInTheDocument();

  await findByText('All the jobs in one convenient place.');

  expect(getByText('All the jobs in one convenient place.')).toBeInTheDocument();


  axiosMock.mockResolvedValueOnce({
    status: 200,
    data: {
      companies: [
        {
          ...testCompany
        }
      ]
    }
  });

  // go to companies route
  fireEvent.click(getByText("Companies"));

  await findByPlaceholderText('Search companies here');

  expect(getByText("Test Company")).toBeInTheDocument();


  axiosMock.mockResolvedValueOnce({
    status: 200,
    data: {
      jobs: [
        {
          ...testJob
        }
      ]
    }
  });

  // go to jobs route
  fireEvent.click(getByText("Jobs"));

  await findByPlaceholderText('Search jobs here');

  expect(getByText("Test Jobs")).toBeInTheDocument();
});


