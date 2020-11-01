import React, { useState } from 'react';
import addNewPatient from '../../Reducers/action';
import { connect } from 'react-redux';
import Table from '../../Components/Table';
import './AddNewPatient.css';
import * as Constants from '../../Constants/Constants';
import Label from '../../Components/Label';

function AddNewPatient(props) {
  const [patientDetails, setPatientDetails] = useState({
    fname: '',
    age: '',
    place: '',
    contactnum: '',
    doctorname: '',
  });
  const handleChange = (e) => {
    setPatientDetails({ ...patientDetails, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.addNewPatient(patientDetails);
    
  };

  return (
    <div>
      <h1>{Constants.TRACKER}</h1>
      <form className='form' onSubmit={handleClick}>
        <Label label={Constants.NAME} type='text' name='fname' value={patientDetails.fname} handleChange={handleChange}/>
        <Label label={Constants.AGE} type='number' name='age' value={patientDetails.age} handleChange={handleChange}/>
        <Label label={Constants.PLACE} type='text' name='place' value={patientDetails.place} handleChange={handleChange}/>
        <Label label={Constants.CONTACTNUMBER} type='number' name='contactnum' value={patientDetails.contactnum} handleChange={handleChange}/>
        <Label label={Constants.DOCTORNAME} type='text' name='doctorname' value={patientDetails.doctorname} handleChange={handleChange}/>
         <button type='submit'>Submit</button>
      </form>
      <Table />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addNewPatient: (patientDetails) => dispatch(addNewPatient(patientDetails)),
});

export default connect(null, mapDispatchToProps)(AddNewPatient);
