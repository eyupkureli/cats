import React from "react";
import { Container} from "reactstrap";
import Navi from "../navi/Navi";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard"
import Upload from "../upload/Upload"
import FavCats from "../cats/FavCats"

function App() {
  return (
    <Container>
      <Navi></Navi>
      <br></br>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Dashboard}></Route>
          <Route path = "/upload" component={Upload}></Route>
          <Route path = "/favs" component={FavCats}></Route>
          
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
