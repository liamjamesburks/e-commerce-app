import { useState, useContext } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.style.scss';

import {UserContext} from "../contexts/user.context";

const defaultFormFields = {
    'displayName': '',
    'email': '',
    'password': '',
    'confirmPassword': ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user);

            await createUserDocumentFromAuth(user, { displayName: displayName })

            resetFormFields();
        } catch (error) {
            console.log("Error occured signing up the user.");
            console.log(error);
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>
                Sign up with your email and password
            </span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" name="displayName" type="text" onChange={handleChange} value={displayName} required/>
                <FormInput label="Email" name="email" type="email" onChange={handleChange}  value={email} required/>
                <FormInput label="Password" name="password" type="password" onChange={handleChange}  value={password} required/>
                <FormInput label="Confirm Password" name="confirmPassword" type="password" onChange={handleChange}  value={confirmPassword} required/>

                <Button type="submit" buttonType="default">
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm;