import React, { useEffect } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ParkingService from "../services/ParkingService";
import AuthService from "../services/AuthService";

const EditParking=()=>{
    let navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        if(!AuthService.getCurrentUser()){
            navigate("/sign-in")
        }
    });
    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required.'), 
        address: Yup.string()
            .required('Address is required.'),
        country: Yup.string()
            .required('Country is required.'),
        state: Yup.string()
            .required('State is required.'),
        city: Yup.string()
            .required('City is required.'),
        price: Yup.string()
            .required('Price is required.')
            .matches(/^[0-9]+$/, "Price be only digits."),        
        availableslots: Yup.string()
            .required('Available Slots is required.')
            .matches(/^[0-9]+$/, "Total Slots be only digits.")
            .max(Yup.ref('totalslots'), "Cannot Exceed Max Capacity")
            ,
        totalslots: Yup.string()
            .required('Total Slots is required.')
            .matches(/^[0-9]+$/, "Total Slots be only digits.")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit,setValue,  formState } = useForm(formOptions);
    const { errors } = formState;

    useEffect(() => { 
         
        ParkingService.getParkingDetails(id).then((response) => { 
            //Set the form field values
            const fields = ['name', 'address', 'country', 'state', 'city','price','availableslots','totalslots'];
            fields.forEach(field => setValue(field, response.data[field]));
        }).catch(function (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            // navigate("../sign-in", { replace: true }); 
            navigate("/sign-in"); 
          });

    }, [])
    function onSubmit(parking) {
        // display form data on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(parking, null, 4));
        // return false;
        const userValue = AuthService.getCurrentUser()
        parking["_id"] = id;
        parking["user"] = {_id: userValue._id,name: "",mobileNo: "",email: "",password: ""}; 

        ParkingService.editParking(parking).then(res =>{
            // navigate("../", { replace: true }); 
            navigate("/"); 
        });
    }
    
    function redirectListing(){
        navigate("/");
    }

    return (
        <div className="inner-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Edit Parking</h3>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" {...register('name')} placeholder="Enter Parking Name" className="form-control" />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" name="country" {...register('country')} placeholder="Enter Country" className="form-control" />
                            <div className="invalid-feedback">{errors.country?.message}</div>
                        </div>
                    </div> 
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>State</label>
                            <input type="text" name="state" {...register('state')} placeholder="Enter State" className="form-control" />
                            <div className="invalid-feedback">{errors.state?.message}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" {...register('city')} placeholder="Enter Parking Name" className="form-control" />
                            <div className="invalid-feedback">{errors.city?.message}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" name="address" {...register('address')} placeholder="Enter Address" className="form-control" />
                            <div className="invalid-feedback">{errors.address?.message}</div>
                        </div>
                    </div> 
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Price</label>
                            <input type="text" name="price" {...register('price')} placeholder="Enter Parking Price" className="form-control" />
                            <div className="invalid-feedback">{errors.price?.message}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Total Slots</label>
                            <input type="text" name="totalslots" {...register('totalslots')} placeholder="Enter Total Slots" className="form-control" />
                            <div className="invalid-feedback">{errors.totalslots?.message}</div>
                        </div>
                    </div> 
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Available slots</label>
                            <input type="text" name="availableslots" {...register('availableslots')} placeholder="Enter Available Slots" className="form-control" />
                            <div className="invalid-feedback">{errors.availableslots?.message}</div>
                        </div>
                    </div>
                  
                    
                    <div className="col-lg-6">
                        <span><button className="btn btn-dark btn-lg btn-block" onClick={redirectListing}>Back</button></span> &nbsp;
                        <span><button type="submit"  className="btn btn-dark btn-lg btn-block">Update Parking</button> </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditParking;