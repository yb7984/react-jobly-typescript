  # React Jobly

  ## About

  This the React frontend for the Jobly backend using **TypeScript**.

  ## Stack
  - React
    - React Testing Library
    - React Router Dom
  - TypeScript
  - Axios
  - Bootstrap
  - Fontawesome

  ## Hooks
  - ### useAuth ----- hook with loginUser and function to check auth information
  - ### useFields ----- hook to handle form inputs
  - ### useFormError ---- hook to handle error message return from ajax request
  - ### useSearchFields ----- hook to handle live search inputs

  ## Component Hierarchy
  - ### App ---- General page wrapper
    
    state = loginUser

    context = loginUser

    - ### NavigationBar --------- Navigation bar on top of the page

        useContext = loginUser

        props = logout

    - ### Home ---------- Home Route /

        useContext = loginUser
      
    - ### LoginForm ---------- Login Route /login

        state = formData , errorMsg , isLoading
        
        props = login

        hooks = useFields

    - ### SignUpForm --------- Sign Up Route /signup

        state = formData , errorMsg , isLoading
        
        props = signUp()

        hooks = useFields

    - ### Companies ------ Companies Route /companies

      state = searchParams 
      
      hooks = useAuth

      - ### CompanySearchForm ---- Search Form 
  
        state = formData

        props = searchParams , setSearchParams

        hooks = useSearchFields

      - ### CompanyList --- List of Companies

        state = isLoading , companies

        props = searchParams , setSearchParams

        - ### CompanyListItem --- showing simple info about a company and link to company detail route

        props = company

    - ### Jobs ----------- Jobs Route /jobs

      state = searchParams 
      
      hooks = useAuth

      - ### JobSearchForm ---- Search Form Same as Companies Route

        state = formData

        props = searchParams , setSearchParams

        hooks = useSearchFields

      - ### JobList  ------- List all jobs 

        state = isLoading , jobs

        props = searchParams , listJobs

        - ### JobListItem ----- job list item

            props = job , showCompany

            useContext = loginUser , setLoginUser

    - ### CompanyDetail -------- Company Detail Route /companies/:companyHandle

      state = company

      hooks = useAuth

      params = handle

      - ### JobList ------- list all jobs of the company, the same one as /jobs route
        
        state = isLoading , jobs

        props = searchParams , listJobs

        - ### JobListItem ---- jobs list item

            props = job , showCompany

            useContext = loginUser , setLoginUser

    - ### ProfileForm ---- Profile Route /profile

        state = formData , alertMsg , errorMsg , isLoading

        useContext = loginUser , setLoginUser

        hooks = useAuth , useFormError , useFields

    - ### Loading ---- Simple component to show when loading data.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
