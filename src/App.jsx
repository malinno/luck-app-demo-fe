// src/App.js
// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./MainPage";
import SpinCountPage from "./SpinCountPage";
import GiftList from "./Gitft";
import GiftBaskets from "./GiftBaskets";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/spincount" component={SpinCountPage} />
        <Route path="/gitfts" component={GiftList} />
        <Route path="/giftbaskets" component={GiftBaskets} />
      </Switch>
    </Router>
  );
};

export default App;
