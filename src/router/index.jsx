import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PageLoader from "@/components/PageLoader";

const Dashboard = lazy(() =>
  import(/*webpackChunkName:'DashboardPage'*/ "@/pages/Dashboard")
);
const User = lazy(() => import(/*webpackChunkName:'UserPage'*/ "@/pages/User"));

const Customer = lazy(() =>
  import(/*webpackChunkName:'CustomerPage'*/ "@/pages/Customer")
);
const Invoice = lazy(() =>
  import(/*webpackChunkName:'InvoicePage'*/ "@/pages/Invoice")
);
const Quote = lazy(() =>
  import(/*webpackChunkName:'QuotePage'*/ "@/pages/Quote")
);
const Login = lazy(() =>
  import(/*webpackChunkName:'LoginPage'*/ "@/pages/Login")
);
const Logout = lazy(() =>
  import(/*webpackChunkName:'LogoutPage'*/ "@/pages/Logout")
);
const NotFound = lazy(() =>
  import(/*webpackChunkName:'NotFoundPage'*/ "@/pages/NotFound")
);

function Router() {
  const location = useLocation();
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <PrivateRoute path="/" component={Dashboard} exact />
          <PrivateRoute component={Customer} path="/customer" exact />
          <PrivateRoute component={User} path="/user" exact />
          <PrivateRoute component={Invoice} path="/invoice" exact />
          <PrivateRoute component={Quote} path="/quote" exact />
          <PrivateRoute component={Logout} path="/logout" exact />
          <PublicRoute component={Login} path="/login" exact />
          <Route path="/loader" component={PageLoader} />
          <Route
            path="*"
            component={NotFound}
            render={() => <Redirect to="/notfound" />}
          />
        </Switch>
      </AnimatePresence>
    </Suspense>
  );
}

export default Router;
