import { FC, FormEvent, FormEventHandler, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFields from './hooks/useFields';
import Loading from './Loading';
import FormInput from './FormInput';
import './SignUpForm.css';
import useFormError from './hooks/useFormError';

interface SignUpFormProps {
    signup: Function
}

/**
 * /signup route, showing a sign up form.
 * @param {*} props contains {
 * signup : function for handling user sign up.
 * } 
 * @returns 
 */
const SignUpForm: FC<SignUpFormProps> = ({ signup }: SignUpFormProps) => {
    const [errorMsg, setErrorMsg] = useFormError();
    const [formData, handleChange] = useFields({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const history = useHistory();

    const handleSubmit: FormEventHandler = async (e: FormEvent) => {
        setIsLoading(true);

        e.preventDefault();

        try {
            let result = await signup(formData);

            if (result === true) {
                setIsLoading(false);

                history.push('/');
            }
        } catch (error) {
            setErrorMsg(error);
            setIsLoading(false);
        }
    }

    if (!isLoading) {

        return (
            <div className="SignUpForm mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="text-center h1">Sign Up</div>
                    <p className="text-danger">{errorMsg.formErrors}</p>
                    <FormInput name="username"
                        title="Username"
                        placeholder="Enter username"
                        value={formData.username}
                        required={true}
                        handleChange={handleChange}
                        errorMsg={errorMsg.fieldErrors.username}
                    />


                    <FormInput name="password"
                        title="Password"
                        placeholder="Enter password"
                        value={formData.password}
                        required={true}
                        type="password"
                        minLength={5}
                        handleChange={handleChange}
                        errorMsg={errorMsg.fieldErrors.password}
                    />


                    <FormInput name="firstName"
                        title="First Name"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        required={true}
                        handleChange={handleChange}
                        errorMsg={errorMsg.fieldErrors.firstName}
                    />

                    <FormInput name="lastName"
                        title="Last Name"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        required={true}
                        handleChange={handleChange}
                        errorMsg={errorMsg.fieldErrors.lastName}
                    />

                    <FormInput name="email"
                        title="Email"
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        required={true}
                        handleChange={handleChange}
                        errorMsg={errorMsg.fieldErrors.email}
                    />

                    <div className="mb-3 text-center">
                        <button className="btn btn-primary btn-lg" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div >);
    } else {
        return (<Loading />)
    }
}

export default SignUpForm;