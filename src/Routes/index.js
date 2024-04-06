import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GuardRoutes from "./guardRoutes";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import AboutUs from "../Pages/Aboutus";
import Contact from "../Pages/Contact";
import ScrollToAnimation from "../Pages/ScrollToAnimation";
import Cart from "../Pages/Cart";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={() => <Login />} />
        {/* <Route exact path="/" component={() => <Home />} />
          <Route exact path="/about-us" component={() => <AboutUs />} />
          <Route exact path="/contact" component={() => <Contact />} />
          <Route
            exact
            path="/animationOnScroll"
            component={() => <ScrollToAnimation />}
          /> */}
        <GuardRoutes
          exact
          path="/"
          component={Home}
          // allowRole={["แอดมิน", "ผู้แก้ไข", "ผู้อ่าน"]}
        />
        <GuardRoutes
          exact
          path="/cart"
          component={Cart}
          // allowRole={["แอดมิน", "ผู้แก้ไข", "ผู้อ่าน"]}
        />
        <GuardRoutes exact path="/about-us" component={AboutUs} />
        <GuardRoutes exact path="/contact" component={Contact} />
        <GuardRoutes
          exact
          path="/animationOnScroll"
          component={ScrollToAnimation}
        />
      </Switch>
    </Router>
  );
};
export default Routes;
