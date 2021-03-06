import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import ParkingService from "../services/ParkingService";

const ParkingListing=()=>{
    let navigate = useNavigate()
    const [APIData, setAPIData] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        // axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
        //     .then((response) => {
        //         setAPIData(response.data);
        //     })
        if(!AuthService.getCurrentUser()){
            navigate("/sign-in")
            return false;
        } 
        const user = { name: "", country: "", state: "", city: "",address:"" };
        ParkingService.getParkingListing(user).then((response) => {
                setAPIData(response.data);
        }).catch(function (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            localStorage.clear();
            navigate("../sign-in"); 
        });
    }, []);

    function addParking(){
        navigate("../add-parking",{replace:true})
    }

    function editParking(id){
        // navigate("../edit-parking/"+id,{replace:true}); 
        navigate("/edit-parking/"+id); 
    }

    function viewParking(id){
        // navigate("../parking-details/"+id,{replace:true}); 
        navigate("/parking-details/"+id); 
    }

    function deleteParking(id){
        ParkingService.deleteParking(id).then((response) => {
            getData();
        }).catch(function (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            navigate("/sign-in"); 
        });
    }

    function getData(val){ 
        if(val=="search"){
            const country = document.getElementById("searchCountry").value
            const city = document.getElementById("searchCity").value    
            const state = document.getElementById("searchState").value    
            const name = document.getElementById("searchName").value       
         
            var user = { name: name, country:country, state: state, city: city,address:"" };
        }else{
            document.getElementById("searchCountry").value = "";
            document.getElementById("searchCity").value = "";
            document.getElementById("searchState").value = "";
            document.getElementById("searchName").value = "";

            var user = { name: "", country:"", state:"", city: "",address:"" };
        }
       

        ParkingService.getParkingListing(user).then((response) => {
                setAPIData(response.data);
        }).catch(function (error) {
            alert(error)
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            // navigate("../sign-in", { replace: true }); 
            navigate("/sign-in"); 
          });
    }
    // return (
    //     <div className="container">
    //         <div className="row">
    //             <div className="col-lg-12">
    //                 <div className="inner-listing">
    //                     {
    //                         APIData.map(
    //                             (data) => {
    //                                 return ( 
    //                                     <div className="col-lg-6">

    //                                         <p>This is parking listing page</p>
    //                                         <h3>{data.name}</h3>
    //                                     </div>
    //                                 ) 
    //                             }
    //                         )
    //                     }
    //                 </div>
    //             </div>
    //          </div>
    //     </div>
    // );

    return (
        <div className="inner-list">
             {/* <h2 className="text-center">Parking List</h2> */}
             {/* <div className = "row">
                <button className="btn btn-primary" onClick={addParking}> Add Parking</button>
             </div> */} 
             <div className="row">
                 <div className="col-lg-2">
                     <div className="form-group">
                        <input type="text"  id="searchName"  placeholder="Search Name" className="form-control" />
                    </div>
                 </div> 
                 <div className="col-lg-2">
                     <div className="form-group">
                        <input type="text" id="searchCountry" placeholder="Search Country" className="form-control" />
                    </div>
                 </div> 
                 <div className="col-lg-2">
                     <div className="form-group">
                        <input type="text"  id="searchState"   placeholder="Search State" className="form-control" />
                    </div>
                 </div> 
                 <div className="col-lg-2">
                     <div className="form-group">
                        <input type="text"  id="searchCity"  placeholder="Search City" className="form-control" />
                    </div>
                 </div> 
             
                 <div className="col-lg-2 margin-search" >
                     <div className="form-group">
                        <span><button onClick={()=>getData("search")} className="btn btn-dark btn-lg btn-block">Search</button> </span>
                        <span><button onClick={()=>getData("clear")} className="btn btn-dark btn-lg btn-block">Clear</button> </span>
                    </div>
                 </div> 
             </div> 
             <br></br>
             <div className = "row">
                 <div className="col-lg-12">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Parking Name</th>
                                <th> Country</th>
                                <th> State</th>
                                <th> City</th>
                                <th> Address</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                APIData.map(
                                    (data) => {  
                                        return(
                                            <tr key = {data._id}>
                                                <td> {data.name} </td>   
                                                <td> {data.country}</td>
                                                <td> {data.state}</td>
                                                <td> {data.city}</td>
                                                <td> {data.address}</td>
                                                <td>
                                                    {/* <button onClick={ () =>  editParking(data._id)} className="btn btn-info">Update </button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => deleteParking(data._id)} className="btn btn-danger">Delete </button> */}
                                                    <button style={{marginLeft: "10px"}} onClick={ () => viewParking(data._id)} className="btn btn-info">View </button>
                                                </td>
                                            </tr>
                                        )
                                    }    
                                )
                            }
                        </tbody>
                    </table>
                </div>
             </div>
        </div>
    )
}

export default ParkingListing;

// {APIData.map((data) => {
//     {console.log(data.name)}
//     <tr>
//         <td>{data.name}</td>
//         <td>{data.address}</td>
//         <td>{data.country}</td>
//         <td>{data.state}</td>
//         <td>{data.city}</td>
//     </tr>
// })}