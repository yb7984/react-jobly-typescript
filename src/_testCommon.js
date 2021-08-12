"use strict";

//mock localStorage
const localStorageMock = {
  data: {},
  getItem: (key) => {
    return data[key] === undefined ? null : data[key];
  },
  setItem: (key, value) => {
    data[key] = value;
  }
}

// token ("testuser" / "password")
const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

const testUser = {
  username: "testuser",
  firstName: "test_f",
  lastName: "test_l",
  isAdmin: true,
  applications: []
};

const testCompany = {
  handle: "test",
  name: "Test Company",
  numEmployees: 200,
  description: "test test"
};

const testJob = {
  id: "test",
  title: "Test Jobs",
  salary: 200000,
  equity: 70,
  companyHandle: "testcom",
  companyName: "Test Company"
};

module.exports = {
  localStorageMock,
  testToken,
  testUser,
  testCompany,
  testJob
};
