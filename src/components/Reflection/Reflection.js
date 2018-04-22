import React, { Component} from 'react';
import {connect} from 'react-redux';
import ReflectionList from './ReflectionList/ReflectionList';

const mapStateToProps = reduxState => ({
    reduxState
});

class Reflection extends Component {

    //server request for data
    componentDidMount() {
        console.log('getting data');
        this.props.dispatch({
            type: 'GET_REFLECTION'
        })
    }

    render() {
        
        let reflections = this.props.reduxState.reflectionListReducer.map((reflection) => {
            console.log(reflections)
            return (
                <ReflectionList key = {reflection.id}
                // topic = {reflection.topic}
                // description = {reflection.description}
                // // bookmarked = {reflection.bookmarked}
                // date = {reflection.date}
                reflection= {reflection} />
            )
        });

        return(
            <div className="reflection">
                {reflections}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Reflection);