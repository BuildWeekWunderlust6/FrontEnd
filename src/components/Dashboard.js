import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";

const Dashboard = () => {
    const [data, setData] = useState([]);
    const token = window.localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const userID = decoded.sub;
    const userName = decoded.first_name;
    
   

    const { register, handleSubmit, watch, errors } = useForm();
    const onListSubmit = newList => { console.log("Submitted data", newList)};
    const onTaskSubmit = newTask => { console.log("Submitted data", newTask)};

    useEffect(() => {
        axios.get(`https://ls-wunderlist--production.herokuapp.com/api/users/${userID}/todo-lists`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log("Error", error);
            })
    }, [data]);

    return (
    <div className = "dashboard">
    <div className = "dashboardtitle">
        <h2>Welcome, {userName}. You can see all of your lists here!</h2> 
        
        </div>
        <div className = "newcardform">
            <form onListSubmit = {handleSubmit(onListSubmit)} className = "newcard">
                <input name = "listname" placeholder = "Add new list" ref = {register({required : true})} />
                <input type = "submit" />
            </form>
        </div>
        <div className = "allcards">

        {data.map(data => {
            return (
            <div className = "card">
            <button className = "delete" type = "button">Delete</button>
            <h2>{data.name}</h2>
            <div className = "list">
            <form onTaskSubmit = {handleSubmit(onTaskSubmit)} className = "newtask">
                <input name = "taskname" placeholder = "Add new task" ref = {register({required : true})} />
                <input type = "submit" />
            </form>
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
        })}

      
            </div>

            </div>
      
    );
 
}

export default Dashboard;