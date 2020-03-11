import React from 'react';
const signUp = (props) => {
    const abc={
        uname:null,
        pssd:null
    }
    console.log("signup")
    return (
        <div>
            <div>
                <input type="text"  placeholder="username" id='myText'onChange={abc.uname= document.getElementById("myText")} name="username"/>
                <input type="password" placeholder="Password" id='myTexts'onChange={abc.pssd=document.getElementById("myTexts")} name="pssd"/>
               {abc.pssd}
                <button  onSubmit={props.submitSignUp(abc.uname,abc.pssd)}>SignUp</button>
            </div>
        </div>
    );
}
export default signUp;