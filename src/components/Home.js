import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { animated } from "react-spring";
import SpringProps from "./Animations";


export default function Home() {
    return (
        <animated.div style = {SpringProps()}>
        <div className = "maincard">
        <div className = "homepage">
            <div className = "hometext">
                <h2>Welcome to the homepage!</h2> 
                <p>Need to access the dashboard? <Link to = "/login">Login</Link></p>
            </div>
        </div>
        </div>
        </animated.div>
    )};