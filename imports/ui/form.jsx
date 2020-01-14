import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/task.jsx'
import "./form.css"
import fs from "fs";
import Buffer from "buffer";

import { Validate } from "raysk-vali";
class Form extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
            location: { label: "" }, 
            post: "",
            postType: "text",
            fileName:"",
            file: null
         }
        this.googleUrl = "https://maps.googleapis.com/maps/api/geocode/json";
    }

    getAddressFromLatLong = ( query ) =>{
        let url = new String(this.googleUrl + query);
        url = url.toString(); 
        console.log(url)
        fetch(url).then(response=>response.json())
        .then(data=>{ 
            console.log(`data`, data)
            const location = this.state.location;
            console.log(data.results[0].address_components)
            data.results[0].address_components.map(item=>{
                if(item.types.includes("administrative_area_level_2")){
                    location['label'] = item.long_name;
                    this.setState({location})
                }
            })
            console.log(`location`, location)
        })
        .catch(err=>{ console.log(`Error: ${err}`) })
    }

    handleSubmit(event) {
        event.preventDefault();
        const file = this.refs.fileUploader;
        const text = this.state.post;
        
        // if(Validate.isEmpty(text)) alert(`Please Enter valid post`)
        // else{
        //     const postType = this.state.postType;
        //     Tasks.insert({ text, postType, location: this.state.location['label'],  createdAt: new Date() });
        // }
        
        // this.setState({post: ""})
        // this.setState({fileName: file.files[0].name});
        // ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    handleChange = (event) =>{
        const post = event.currentTarget.value;
        this.setState({post});
    }
    handleFileChange = event =>{
        console.log(event.target.files[0]);
        this.setState({file: event.target.files[0], loaded: 0});
        
    
    }

    handlePinClick() {
        navigator.geolocation.getCurrentPosition( location =>{
            this.setState({location: location.coords});
            const geoQuery = encodeURI(`?latlng=${location.coords.latitude}, ${location.coords.longitude}&key=AIzaSyBfvdlr4pZ5UbmIM9KzNSASmDy9pZsLQn0`);
            this.getAddressFromLatLong(geoQuery);
        }, err =>{ console.log(`Error while fetching location ${err}`) })
    }
    handleCamClick(){
        console.log(ReactDOM.findDOMNode(refs.webcamRef));
    }
    handleDocClick(){
        const file = this.refs.fileUploader;
        file.click();

    }
     
    render() { 
        return ( 
            <div className="form-container">
                <form>
                    {this.state.location.label ? <span className="tag">{this.state.location.label}</span>: null}
                    <textarea style={{marginTop:55}} cols="40" rows="5" type="text" ref="textInput" placeholder="Write something to post"/>
                    <div className="form-bottom">
                        <div className="form-bottom-icons">
                            <div onClick={()=>this.handlePinClick()}>
                                <img src="/pin.png" title="location" className="icon"/>    
                            </div>
                            
                            <div onClick={()=>this.handleCamClick()}>
                                <img src="/camera.png" className="icon" title="camera"/>
                            </div>
                            <div>
                                <input type="file" id="file" accept="image/*" onChange={this.handleFileChange}/>
                                <img src="/contract.png" className="icon" title="document"/>
                            </div>
                        </div>
                        <button className="btn" onClick={this.handleSubmit.bind(this)}>Submit</button>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default Form;