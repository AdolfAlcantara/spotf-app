import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../App';
import LibraryComponent from '../components/Library/Library';

const AppRouter = () =>{

    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App}/>
            <Route path="/library" component={LibraryComponent}/>
        </Switch>
    </BrowserRouter>)
}

export default AppRouter;