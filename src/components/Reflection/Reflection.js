import React, { Component} from 'react';
import {connect} from 'react-redux';
import ReflectionList from './ReflectionList/ReflectionList';

const mapStateToProps = reduxState => ({
    reduxState
});

class Reflection extends Component {

    //getting current data from db
    componentDidMount() {
        console.log('getting data');
        this.props.dispatch({
            type: 'GET_REFLECTION'
        })
    }

    render(){
        console.log(this.props.reduxState)
        let notes = this.props.reduxState.reflectionListReducer.map((reflection) => {
            return (
                <ReflectionList key = {reflection.id}
                topic = {reflection.topic}
                description = {reflection.description}
                bookmarked = {reflection.bookmarked}
                date = {reflection.date}
                reflection= {reflection}/>
            )
        })
        return(
            <div>
                <p>REFLECTION</p>
                {notes}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Reflection);