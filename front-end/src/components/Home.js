import React, { useState } from "react";
import ReactDOM from "react-dom";
import LogoPic from "./pics/app_logo.png";
import Dots from "./pics/dots.png";
import Curve from "./pics/curve.png";
import "./home_styles.css";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space } from 'antd';


function Home() {
  // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
    const database = [
    {
        username: "user1",
        password: "pass1"
    },
    {
        username: "user2",
        password: "pass2"
    }
];

const errors = {
    uname: "invalid username",
    pass: "invalid password"
};

const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
        if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
    } else {
        setIsSubmitted(true);
    }
    } else {
      // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
    }
};

  // Generate JSX code for error message
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
    const renderForm = (
    <form onSubmit={handleSubmit}>
    </form>
);

return (
    <div className="home">
        <div className="home-form">
            <div className="title-home">PAIN LEVEL</div>
                <div className="pain-level-container"></div>
            <div className="title-home">BLOOD LEVEL</div>
                <div className="blood-level-container"></div>
            <div className="title-home">DIARY</div>
                <input type='text'></input>
            {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            <br></br>
        </div>
    </div>
);
}

export default Home;