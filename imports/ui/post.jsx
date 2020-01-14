import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Tasks} from "../api/task";
import Card from "./card";

class Post extends Component {
    rednerPost() { return this.props.tasks.map(task => <Card key={task._id} data={task}/>); }
    render() { 
        return this.rednerPost()
    }
}
 
export default withTracker(() => {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
    };
  })(Post);