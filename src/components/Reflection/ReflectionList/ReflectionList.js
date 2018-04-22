import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState
});

class ReflectionList extends Component {
    // constructor(props){
    //     super(props)
    state={
        newReflection: {
            id: '',
            topic: '',
            description: '',
            // bookmarked: '',
            date: ''
       }
    // }
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


    handleClickDelete = () => {
        console.log('in handleclick delete');
        this.deleteReflection(this.props.reflection);
    }

    deleteReflection = ()=> {
        console.log('in delete button')
        this.props.dispatch({
            type: 'REMOVE_REFLECTION',
            payload: this.props.reflection
        })
    }

    render(){
        // console.log(this.props.reduxState.
        return(
            <div className="reflectionList">
            
           {/* <pre>{JSON.stringify(this.props.reduxState.reflectionListReducer)}</pre>  */}
           
            <p>{this.props.reflection.id}
            {this.props.reflection.topic}
            {this.props.reflection.description}
            {this.props.reflection.bookmarked}
            {this.props.reflection.date}</p>
            <button onClick={this.handleClick}>Add New</button>
            <button onClick={this.handleClickDelete}>Delete</button>
            
            </div>
        )
    }//switching ReflectionList to reflection, then changed to reduxState(
        //no longer getting id undefinded error// back to reflection
//)

}// the component and component list do not match i bet this where 
//the error is that is stopping the server from running



export default connect(mapStateToProps)(ReflectionList);