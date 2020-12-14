import React from "react";
import { Switch } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import Donate from "./pages/Donate";
import LogIn from "./pages/LogIn";
import ProtectedPage from "./pages/ProtectedPage";
import Signup from "./pages/Signup";
import NormalRoute from "./routing-components/NormalRoute";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import { getLoggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import Shop from "./pages/Shop";
import NewProduct from "./pages/NewProduct";
import SingleProductPage from "./pages/SingleProductPage";
import Cart from "./pages/Cart";

class App extends React.Component {
  state = {
    user: null,
    isLoading: true,
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return this.setState({
        isLoading: false,
      });
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        console.log("RES IN CASE OF FAILURE", res);
        // deal with failed backend call
        return this.setState({
          isLoading: false,
        });
      }
      this.setState({
        user: res.data.user,
        isLoading: false,
      });
    });
  };

  handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return this.setState({
        user: null,
        isLoading: false,
      });
    }
    this.setState(
      {
        isLoading: true,
      },
      () => {
        logout(accessToken).then((res) => {
          if (!res.status) {
            // deal with error here
            console.log("SOMETHING HAPPENED", res);
          }

          localStorage.removeItem("accessToken");
          return this.setState({
            isLoading: false,
            user: null,
          });
        });
      }
    );
  };

  authenticate = (user) => {
    this.setState({
      user,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    }

    return (
      <div className="App">
        <Switch>
          <NormalRoute exact path={PATHS.HOMEPAGE} component={HomePage} />
          <NormalRoute exact path={PATHS.DONATE} component={Donate} />
          <NormalRoute exact path={PATHS.SHOP} component={Shop} />
          <NormalRoute
            exact
            path={PATHS.SINGLEPRODUCT}
            component={SingleProductPage}
          />
          <NormalRoute exact path={PATHS.CART} component={Cart} />
          <ProtectedRoute
            exact
            path={PATHS.NEWPRODUCT}
            component={NewProduct}
            user={this.state.user}
          />
          <NormalRoute
            exact
            path={PATHS.SIGNUPPAGE}
            authenticate={this.authenticate}
            component={Signup}
          />
          <NormalRoute
            exact
            path={PATHS.LOGINPAGE}
            authenticate={this.authenticate}
            component={LogIn}
          />
          <ProtectedRoute
            exact
            path={PATHS.PROTECTEDPAGE}
            component={ProtectedPage}
            user={this.state.user}
          />
          <ProtectedRoute
            exact
            path={PATHS.UPDATEPROFILE}
            component={UpdateProfile}
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
          <ProtectedRoute
            exact
            path={PATHS.PROFILE}
            component={Profile}
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
        </Switch>
        <Navbar user={this.state.user} />
      </div>
    );
  }
}

export default App;
