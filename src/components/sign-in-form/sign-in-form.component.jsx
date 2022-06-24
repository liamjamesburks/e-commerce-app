import { useState } from "react";

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import './sign-in-form.style.scss';

const defaultFormFields = {
    'email': '',
    'password': ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
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


    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" name="email" type="email" onChange={handleChange}  value={email} required/>
                <FormInput label="Password" name="password" type="password" onChange={handleChange}  value={password} required/>

                <div className="flex">
                    <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.default}>
                        Sign In
                    </Button>
                    <div className="p"/>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Sign in with Google
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;