import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
// ACTIONS
import { updateList, deleteList, getData } from '../actions/index';
import { animated } from "react-spring";
import SpringProps from "./Animations";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import GetStatus from "./GetStatus";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

const Dashboard = (props) => {
    const [data, setData] = useState([]);
    const [newTitleText, setNewTitleText] = useState({
        name: "",
    });
    const token = window.localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const userID = decoded.sub;
    const userName = decoded.first_name;

    const [loadStatus, setLoadStatus] = useState(false);

    //UPDATE FUNCTION
    const handleChanges = e => {
        setNewTitleText({[e.target.name]: e.target.value});
       
      };

    const updateTitle = (text, id) => {
        props.updateList(text, id);
    }

    //DELETE FUNCTION

    const deleteItem = id => {
        props.deleteList(id);
    }


    const { register, handleSubmit, watch, errors } = useForm();
    const onListSubmit = newList => { console.log("Submitted data", newList)};
    const onTaskSubmit = newTask => { console.log("Submitted data", newTask)};

    useEffect(() => {
       
        
        setLoadStatus(true);
        props.getData();
        setLoadStatus(false);     
        
         
    }, []);

   //CARDS

    return (
    <div className = "dashboard">
        <animated.div style = {SpringProps()}>
        <div className = "status">
        <GetStatus loaded = {loadStatus} username = {userName} />
        </div>
        </animated.div>
    <div className = "dashboardtitle">
        
        </div>
        <div className = "newcardform">
            <form onListSubmit = {handleSubmit(onListSubmit)} className = "newcard">
                <TextField id = "listname" type = "text" placeholder = "Add new list" ref = {register({required : true})} />
                <Button size = "small" type = "submit" variant = "contained" color = "primary">Add</Button>
            </form>
        </div>
        <animated.div style = {SpringProps()}>
        <div className = "allcards">
  


        {props.lists.map(data => {
            console.log("this is data", data);
           
            const id = data.id;
            return (
            <div key={data.id} className = "card">
            <Button size = "small" color = "secondary" variant = "outlined" onClick={() => {deleteItem(id)}}className = "delete" type = "contained">Delete</Button>
            <h2>{data.name}</h2>
            
             <TextField name = "name" placeholder = "New name" onInput = {handleChanges}></TextField>

            <Button size = "small" variant = "contained" color = "primary" onClick={() => {updateTitle(newTitleText, id)}}>Update</Button>

                <TextField name = "taskname" placeholder = "Add new task"></TextField>
                <Button size = "small" type = "submit" variant = "contained" color = "primary">Add</Button>
                
                <div className = "list">
            <label>First Task
            <input name = "isCompleted" type = "checkbox" />
            <br/>
            </label>
            <label>Second Task
            <input name = "isCompleted" type = "checkbox" />
            <br/>
            </label>
            <label>Third Task
            <input name = "isCompleted" type = "checkbox" />
            <br/>
            </label>
            <label>Fourth Task
            <input name = "isCompleted" type = "checkbox" />
            <br/>
            </label>
            <label>Fifth Task
            <input name = "isCompleted" type = "checkbox" />
            <br/>
            </label>
            </div>
            </div>

            )
            
    

         
            
        
        })
        }

      
            </div>
            </animated.div>

            </div>
      
    );
 
}

const mapStateToProps = state => {
    return {
       lists: state.lists,
       isFetching: state.isFetching
        
        
        
       
    }
};

export default connect(
    mapStateToProps,
    {updateList, deleteList, getData}
)(Dashboard); 