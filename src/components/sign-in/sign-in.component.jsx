import { useState } from "react";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth, 
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../from-input/form-input.component';
import { SingUpContainer, ButtonsContainer } from './sign-in.styles.jsx';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";


const defaultFormFeilds = {
    email: "",
    password: "",
}

const SignInForm = () => {

    const [formFeild, setFormFeild] = useState(defaultFormFeilds);
    const { email, password } = formFeild;

    const onChangeHandler = (event) => {
        const {name, value } = event.target;
        setFormFeild({...formFeild,[name]:value});
    }

    const handelSubmit = async (event) => {
        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFeilds()
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert("incorrect password for email")
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const resetFormFeilds = () => {
        setFormFeild(defaultFormFeilds);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    return (
        <SingUpContainer>
            <h2>Already have an account?</h2>
            <span>sign in with your email and password</span>

            <form onSubmit={handelSubmit}>

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

                <ButtonsContainer>
                    <Button type="submit">SIGN IN</Button>
                    <Button onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google} type="button">Google sign in</Button>
                </ButtonsContainer>
            </form>
        </SingUpContainer>
    )
}

export default SignInForm;