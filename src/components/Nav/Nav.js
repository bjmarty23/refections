import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import New from '../New/New';
import Reflection from '../Reflection/Reflection';


class Nav extends Component {
 

    render(){
        return (
            <Router>
                <div>
                    <nav>
                    <Link to="/new">Add New Reflection</Link>
                    <Link to="/reflection">Current</Link>
                     </nav>
                    <Route path='/new' component={New}/>
                    <Route path='/reflection' component={Reflection}/>
                </div>
            </Router>
        )
    }
}

export default Nav;