import React, { Component } from 'react';
import { Tasks } from '../api/task';


class Card extends Component {
    handleStarClick(e, _id){
        const arr = e.currentTarget.querySelector("img").src.split("/");
        const {likes = 0, ...rest} = Tasks.findOne({_id});
        if(arr[arr.length - 1] == "star-fill.png"){
            e.currentTarget.querySelector("img").src = "./star.png"
            Tasks.update({_id}, {...rest, likes: likes - 1});
        }else {
            Tasks.update({_id}, {...rest, likes: likes + 1});
            e.currentTarget.querySelector("img").src = "./star-fill.png"
        }
        
    }
    render() { 
        const {text, _id, createdAt, location, likes} = this.props.data;
        return ( 
        <div className="card">
            <div className="card-body">
                <p className="time">{new Date(createdAt).toDateString()}</p>
                <p className='body-text'>{text.length > 120 ? text.substring(0, 112) + "..." : text}</p>
                {location?<p className="tags">{location}</p>:null}
            </div>
            <div className="card-footer">
        <div onClick={(e)=>this.handleStarClick(e, _id)}>
            <img className="icon" style={{width:20, height:20}} src="./star.png"/>
            {likes?likes:0}
        </div>
            </div>
        </div>

       );
    }
}
 
export default Card;