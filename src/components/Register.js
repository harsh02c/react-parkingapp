import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from "../services/AuthService";

const Register=()=> {
    let navigate = useNavigate();
      // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required.'), 
        email: Yup.string()
            .required('Email is required.')
            .email('Email is invalid.'),
        mobileNo: Yup.string()
            .min(10, 'Mobile Number must be at least 10 characters.')
            .matches(/^[0-9]+$/, "Mobile Number be only digits.")
            .required('Mobile Number is required.'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters.')
            .required('Password is required.'),
        // confirmPassword: Yup.string()
        //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
        //     .required('Confirm Password is required'), 
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit,  formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        // display form data on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(user, null, 4));
        // return false;

        AuthService.registerUser(user).then(res =>{
            // this.props.history.push('/parking-listing');
            // navigate("../sign-in", { replace: true }); 
            navigate("/sign-in"); 
        });
    }

    function SignIn(){
        // navigate("../sign-in", { replace: true }); 
        navigate("/sign-in"); 
    }

    return (
        <div className="inner">

            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" {...register('name')} className="form-control" placeholder="Enter Name" />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" {...register('email')}  className="form-control" placeholder="Enter Email" />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>

                <div className="form-group">
                    <label>Mobile Number</label>
                    <input type="text" name="mobileNo"  {...register('mobileNo')} className="form-control" placeholder="Enter Mobile Number" />
                    <div className="invalid-feedback">{errors.mobileNo?.message}</div>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" {...register('password')} className="form-control" placeholder="Enter Password"/>
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button> 
                <p className="forgot-password text-right">
                    Already registered? <a href="javascript:void(0)" onClick={SignIn}>Log in</a>
                </p>
            </form>
        </div>
    );
} 

export default Register;