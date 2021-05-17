import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create'
import View from './pages/View'
import Import from './pages/Import';
import Edit from './pages/Edit'
import NotFoundPage from './pages/404'
import SignInPage, {Logout} from './components/login';
import Navbar from './components/navbar'
import PrivateRoute from './PrivateRoute'
import './App.css';



function App() {
  
  const [user, setUser] = useState(null);
  let userTmp = localStorage.getItem("user");
  if(userTmp){
    userTmp = JSON.parse(userTmp)
  }

  return (
    <Router>
      <Navbar user={userTmp} setUser={setUser}></Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={() => <SignInPage user={user} setUser={setUser}/>} />
        <Route exact path="/logout" component={() => <Logout setuser={setUser}/>} />
        <PrivateRoute exact path="/create" user={userTmp} component={() => <Create user={userTmp} />} />
        <PrivateRoute exact path="/view" user={userTmp} component={() => <View user={userTmp} />} />
        <PrivateRoute exact path="/import" user={userTmp} component={() => <Import user={userTmp} />}/>
        <PrivateRoute exact path="/edit" user={userTmp} component={() => <Edit user={userTmp} />}/>
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect to="/404" /> 
      </Switch>
    </Router>
  );
}

export default App;

/*
 <Router>
      <Navbar user={userTmp} setUser={setUser}></Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={() => <SignInPage user={user} setUser={setUser}/>} />
        <Route exact path="/logout" component={() => <Logout setuser={setUser}/>} />
        <PrivateRoute exact path="/doWorkout" user={userTmp} component={() => <WatchWorkout user={userTmp} options={options}/>} />
        <PrivateRoute exact path="/dashboard" user={userTmp} component={() => <Dashboard user={userTmp} options={options}/>} />
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect to="/404" /> 
      </Switch>
    </Router>
*/