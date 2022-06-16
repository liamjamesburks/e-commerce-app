import { useState, useContext } from "react";

import { UserContext } from "../contexts/user.context";

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.style.scss';

const defaultFormFields = {
    'email': '',
    'password': ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);

            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password");
                    break;
                case 'auth/user-not-found':
                    alert("No user associated with this email.");
                    break;
                default:
                    alert("An error occured.");
                    console.log(error);
            }
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        setCurrentUser(user);
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" name="email" type="email" onChange={handleChange}  value={email} required/>
                <FormInput label="Password" name="password" type="password" onChange={handleChange}  value={password} required/>

                <div className="flex">
                    <Button type="submit" buttonType="default">
                        Sign In
                    </Button>
                    <div className="p"/>
                    <Button type="button" buttonType="google" onClick={logGoogleUser}>
                        Sign in with Google
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;