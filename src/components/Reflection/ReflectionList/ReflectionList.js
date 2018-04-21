import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState
});

class ReflectionList extends Component {
    state={
        newReflection: {
            id: '',
            topic: '',
            description: '',
            bookmarked: '',
            date: ''
       }
    }

    //Posting new reflec to db
    addNewReflection=(reflection)=> {
        this.props.dispatch({
            type: 'NEW_REFLECTION',
            payload: this.state.newReflection
        })
    }

    handleClick=()=>{
        console.log('in posting handleClick')
        this.addNewReflection(this.props.reflection)
    }
    render(){
        return(
            <div className="ReflectionList">
            {this.props.ReflectionList.id}
            {this.props.ReflectionList.topic}
            {this.props.ReflectionList.description}
            {this.props.ReflectionList.bookmarked}
            {this.props.ReflectionList.date}
            <button onClick={this.handleClick}>Add New</button>
            </div>
        )
    }

}



export default connect(mapStateToProps)(ReflectionList);