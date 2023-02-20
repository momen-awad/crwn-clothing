import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../from-input/form-input.component';
import Button from "../button/button.component";
import { SignUpContainer } from './sign-up-form.styles.jsx';


const defaultFormFeilds = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const SignUpForm = () => {

    const [formFeild, setFormFeild] = useState(defaultFormFeilds);
    const {displayName, email, password, confirmPassword } = formFeild;
    

    const onChangeHandler = (event) => {
        const {name, value } = event.target;
        setFormFeild({...formFeild,[name]:value});
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert("passwords does not match");
            return;
        }
        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFeilds();
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert("cannot create user, email already in use");
            }
            console.log(`eroe creating auth using email and password ${error.message}`);
        }
    }

    const resetFormFeilds = () => {
        setFormFeild(defaultFormFeilds);
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>sign up with your email and password</span>

            <form onSubmit={handelSubmit}>
                
                <FormInput 
                label="display name" 
                type="text" 
                name="displayName" 
                onChange={onChangeHandler} 
                required 
                value={displayName}
                />

                <FormInput 
                label="email" 
                type="email" 
                name="email" 
                onChange={onChangeHandler} 
                required 
                value={email} 
                />

                <FormInput
                label="password" 
                type="password" 
                name="password" 
                onChange={onChangeHandler} 
                required 
                value={password}
                />

                <FormInput
                label="confirm password" 
                type="password" 
                name="confirmPassword" 
                onChange={onChangeHandler} 
                required 
                value={confirmPassword}
                />

                <Button type="submit">SIGN UP</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;