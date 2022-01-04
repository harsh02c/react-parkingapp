import React, { useEffect,useState } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import ParkingService from "../services/ParkingService";
import BookingService from "../services/BookingService";
import AuthService from "../services/AuthService";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const ParkingDetails=()=>{
    const navigate = useNavigate();
    let { id } = useParams();
    const [APIDataDetails, setAPIDataDetails] = useState([]);
    useEffect(()=>{
 
        if(!AuthService.getCurrentUser()){
            navigate("/sign-in")
            return false;
        } 

        ParkingService.getParkingDetails(id).then((response) => { 
            //Set the form field values
            // console.log(response.data)
            const fields = ['price', '_id'];
            // fields.forEach(field => setValue(field, response.data[field]));
            setValue("hiddenPrice",response.data["price"])
            setValue("parkingId",response.data["_id"])

            setAPIDataDetails([response.data]);
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

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
        document.body.appendChild(script);
        
    }, []);


    const validationSchema = Yup.object().shape({
        startDate: Yup.string()
            .required('Start Date is required.'), 
        startTime: Yup.string()
            .required('Start Time is required.'), 
        endDate: Yup.string()
            .required('End Date is required.'), 
        endTime: Yup.string()
            .required('End Time is required.'), 
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit,setValue,  formState } = useForm(formOptions);
    const { errors } = formState;

    function redirectListing(){
        navigate("/");
    }

    function openPayModal(amt,bookingId){
        var amount = amt * 100; //Razorpay consider the amount in paise
    var options = {
          "key": "rzp_test_nLdcIfHZDg9AST",
          "amount": 0, // 2000 paise = INR 20, amount in paisa
          "name": "",
          "description": "",
          'order_id':"",
          "handler": function(response) {
              console.log(response);
              var values ={
                  razorpay_signature : response.razorpay_signature,
                  razorpay_order_id : response.razorpay_order_id,
                  razorpay_payment_id : response.razorpay_payment_id,
                  transactionamount : amount,
                  bookingId : bookingId,
                }
                // BookingService.post('http://localhost:5000/upgrade/payment',values)
                // .then(res=>{alert("Success")})
                // .catch(e=>console.log(e)) 
                BookingService.verifySignature(values).then((response) => {
                //   alert("success")
                  navigate("/user-bookings"); 
                }).catch(function (error) {
                    console.log(error)
                    // if (error.response) {
                    //     console.log(error.response.data);
                    //     console.log(error.response.status);
                    //     console.log(error.response.headers);
                    //     alert(error.response.data.message);
                    // }
                    // localStorage.clear();
                    navigate("../sign-in"); 
                });
            },
            "prefill":{
                "name":'Harsh chauhan',
                "email":'test@gmail.com',
                "contact":'1234567890',
            },
          "notes": {
            "address": "Hello World"
          },
          "theme": {
            "color": "#528ff0"
          }
        };
    // BookingService.payBooking('http://localhost:5000/upgrade/order',{amount:amount})
    //     .then(res=>{
    //         options.order_id = res.data.id;
    //         options.amount = res.data.amount;
    //         console.log(options)
    //         var rzp1 = new window.Razorpay(options);
    //         rzp1.open();
    //     })
    //     .catch(e=>console.log(e))
        
    // };
    const payBooking = {"amount":amount,"currency":"INR","receipt":"test"};
    BookingService.payBooking(payBooking).then((response) => {
        options.order_id = response.data.id;
        options.amount = response.data.amount;
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }).catch(function (error) {
        console.log(error)
        // if (error.response) {
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //     console.log(error.response.headers);
        //     alert(error.response.data.message);
        // }
        // localStorage.clear();
        navigate("../sign-in"); 
    });
};
    function onSubmit(booking) {
       
        // display form data on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(booking, null, 4));
        var startT = new Date(booking.startDate+" "+booking.startTime)
        var endT = new Date(booking.endDate+" "+booking.endTime) 
        if(startT>endT){
            alert("Start date/time should be less than End date/time");
        }
        
        var hours = Math.ceil(Math.abs(startT - endT) / 36e5);
        var finalAmount = hours*booking.hiddenPrice; 
    //    openPayModal(finalAmount);
//    alert(finalAmount)
        booking["bookingStartTime"] = startT;
        booking["bookingEndTime"] = endT;
        booking["bookingStatus"] = "pending";
        booking["bookingAmount"] = finalAmount;
        booking["bookingId"] = Math.floor(100000000 + Math.random() * 900000000);
        booking["user"] = {_id: booking.userId,name: "",mobileNo: "",email: "",password: ""};
        booking["parking"] = {_id: booking.parkingId,name: "",address: "",country: "",state: "",city: "",price: "",totalslots: 15,availableslots: 15}; 
        
        BookingService.addBooking(booking).then(res =>{ 
            // openPayModal(1,res.data._id);  
            openPayModal(finalAmount,res.data._id);  
        });
        // openPayModal(0.1);
        return false;

        // AuthService.registerUser(user).then(res =>{
        //     // this.props.history.push('/parking-listing');
        //     // navigate("../sign-in", { replace: true }); 
        //     navigate("/sign-in"); 
        // });
    }
    return (
        <div className="inner-form"> 
            <h3>View Parking</h3>
                {
                    APIDataDetails.map(
                        (data)=>{
                            return(
                                <div className="row" key={data._id}>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Name:</label><br/>
                                            <span>{data.name}</span> 
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Country:</label><br/>
                                            <span>{data.country}</span> 
                                        </div>
                                    </div> 
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>State:</label><br/>
                                            <span>{data.state}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>City</label><br/>
                                            <span>{data.city}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Address:</label><br/>
                                            <span>{data.address}</span>
                                        </div>
                                    </div> 
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Price:</label><br/>
                                            <span>{data.price}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Total Slots:</label><br/>
                                            <span>{data.totalslots}</span>
                                        </div>
                                    </div> 
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Available slots:</label><br/>
                                            <span>{data.availableslots}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        {/* <div className="form-group">
                                            <label>Available slots</label><br/>
                                            <span>J</span>
                                        </div> */}
                                    </div>
                                
                                </div>
                            )
                        }
                    )
                }
            <hr></hr>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input type="hidden" {...register("hiddenPrice")} value={APIDataDetails[0].price?APIDataDetails[0].price:0} />  
                <input type="hidden" {...register("parkingId")} value={APIDataDetails[0]._id}  />  
                <input type="hidden" {...register("userId")} value={AuthService.getCurrentUser()._id}  />   */}
                <input type="hidden" {...register("hiddenPrice")} />  
                <input type="hidden" {...register("parkingId")}    />  
                <input type="hidden" {...register("userId")}  value={AuthService.getCurrentUser()._id}  /> 
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Start Date:</label><br/>
                            <input type="date" {...register('startDate')} className="form-control" placeholder="Enter Start Date" />
                            <div className="invalid-feedback">{errors.startDate?.message}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Start Time:</label><br/>
                            <input type="time" {...register('startTime')} className="form-control" placeholder="Enter Start Date" />
                            <div className="invalid-feedback">{errors.startTime?.message}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>End Date:</label><br/>
                            <input type="date" {...register('endDate')} className="form-control" placeholder="Enter End Date" />
                            <div className="invalid-feedback">{errors.endDate?.message}</div>
                        </div>
                    </div> 
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>End Time:</label><br/>
                            <input type="time"   {...register('endTime')} className="form-control" placeholder="Enter Start Date" />
                            <div className="invalid-feedback">{errors.endTime?.message}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <span><button className="btn btn-dark btn-lg btn-block" onClick={redirectListing}>Back</button></span> &nbsp;
                        <span><button type="submit" className="btn btn-dark btn-lg btn-block"   >Book Parking</button> </span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ParkingDetails;