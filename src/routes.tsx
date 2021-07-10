import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Counter from './containers/Counter';
import Pokemons from './containers/Pokemons';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pokemons" component={Pokemons} />
        <Route exact path="/counter" component={Counter} />
        <Redirect from="/" to="/pokemons" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
