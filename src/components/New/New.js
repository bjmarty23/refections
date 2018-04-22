import React, { Component} from 'react';
import { connect } from 'react-redux'; 


const mapStateToProps = reduxState => ({
    reduxState,
});

class NewReflection extends Component {
    state = {
        newReflection: {
            // id: '',
            topic: '',
            description: '',
            Date: '',
        }
    }

    handleNameChange = event => {
        console.log('event happended')
        this.setState({
            newReflection: {
                ...this.state.newReflection,
                topic: event.target.value,
                description: event.target.value,
                date: event.target.value,
            }
        });
    }

    addNewReflection = event => {
        event.preventDefault();
        console.log(this.state.newReflection);
        this.props.dispatch({ 
            type: 'ADD_REFLECTION', 
            payload: this.state.newReflection })
        this.setState({
            newReflection: {
                topic: '',
                description: '',
                date: '',
                }
        });
    }

    render(){
        return(
            <div>
                 <pre>{JSON.stringify(this.state)}</pre>
                 <form onSubmit={this.addNewReflection}>
                    <input type='text' value={this.state.newReflection.topic} placeholder="Topic"/>
                    <input type='text' value={this.state.newReflection.description} placeholder= "Description"/>
                    <input type='Date' value={this.state.newReflection.date} placeholder= "Date"/>
                                    onChange={this.handleNameChange} />
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(NewReflection);