import React from "react";
import Login from "../modal/Login";
import SignUp from "../modal/SignUp";




const LoginScreen = (props) => {
    return(

        <div align="center" style={{paddingBottom:50,paddingTop:100}}>
            <div style={{width:1519,backgroundColor:"black"}}>
                <div align="left" style={{float:"left"}}>
                    <img src={require('./img/largeLogo-removebg.png')} width="720" height="720" alt="largeLogo" />
                </div>

                <div style={{width:700, float:"left",margin:20}} align="left">
                    <img src={require('./img/miniLogo.jpg')} width="50" height="50" alt="miniLogo" />
                    <h1 style={{fontSize:50}}>Find Everything About Books</h1>
                    <h1>Join Us!</h1>
                    <SignUp setData={props.setData}  />
                    <h2 style={{paddingTop:50}}>Already have an account ?</h2>
                    <Login setData={props.setData} />

                </div>
            </div>
        </div>


    )
}
export default LoginScreen;

