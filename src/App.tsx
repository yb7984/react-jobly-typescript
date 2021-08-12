import NavigationBar from './NavigationBar';
import Home from './Home';
import Companies from './Companies';
import CompanyDetail from './CompanyDetail';
import Jobs from './Jobs';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ProfileForm from './ProfileForm';
import { Switch, Route, useHistory } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FC, useState, MouseEventHandler } from 'react';
import UserContext from './context/userContext';
import JoblyApi from './api';
import Loading from './Loading';
import { User } from './models';

//add the using fontawesome
library.add(faSpinner);

/**
 * Here is where the app starts
 * @returns 
 */
const App: FC = () => {
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const history = useHistory();

  let isLoading: string | false = !loginUser && JoblyApi.token;

  //load login user information if available
  const setUser = async (): Promise<void> => {
    if (isLoading && !loginUser && JoblyApi.token) {
      const user: User | null = await JoblyApi.getCurrentUser();

      if (user) {
        setLoginUser(user);
      } else {
        setLoginUser(null);
      }

      isLoading = false;
    }
  }

  setUser();


  // function for user login
  const login = async (username: string, password: string): Promise<boolean> => {

    const result: any = await JoblyApi.login(username, password);

    if (result === true) {
      setLoginUser(await JoblyApi.getCurrentUser());

      return true;
    }

    return false;
  }

  //function for user sign up
  const signup = async (user: User): Promise<boolean> => {


    const result: any = await JoblyApi.register(user);

    if (result === true) {
      setLoginUser(await JoblyApi.getCurrentUser());

      return true;
    }

    return false;
  }

  // function for user logout
  const logout: MouseEventHandler = (): void => {
    JoblyApi.token = "";
    setLoginUser(null);

    history.push('/');
  }

  if (isLoading) {
    return (<Loading />);
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ loginUser, setLoginUser }}>
        <NavigationBar {...{ logout }} />
        <Switch>
          <Route path="/companies/:handle">
            <CompanyDetail />
          </Route>
          <Route path="/companies">
            <Companies />
          </Route>
          <Route path="/jobs">
            <Jobs />
          </Route>
          <Route path="/profile">
            <ProfileForm />
          </Route>
          <Route path="/signup">
            <SignUpForm signup={signup} />
          </Route>
          <Route path="/login">
            <LoginForm login={login} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            404
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
