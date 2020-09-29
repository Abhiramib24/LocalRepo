import React, { useState } from 'react';
import addNewPatient from '../../Reducers/action';
import { connect } from 'react-redux';
import Table from '../../Components/Table';
import './AddNewPatient.css';
import * as Constants from '../../Constants/Constants';

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
        <label>
          {Constants.NAME}
          <input
            type='text'
            name='fname'
            value={patientDetails.fname}
            onChange={handleChange}
          />
        </label>
        <label>
          {Constants.AGE}
          <input
            type='number'
            name='age'
            value={patientDetails.age}
            onChange={handleChange}
          />
        </label>
        <label>
          {Constants.PLACE}
          <input
            type='text'
            name='place'
            value={patientDetails.place}
            onChange={handleChange}
          />
        </label>
        <label>
          {Constants.CONTACTNUMBER}
          <input
            type='number'
            name='contactnum'
            value={patientDetails.contactnum}
            onChange={handleChange}
          />
        </label>
        <label>
          {Constants.DOCTORNAME}
          <input
            type='text'
            name='doctorname'
            value={patientDetails.doctorname}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
      <Table />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    fname: state.age,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addNewPatient: (patientDetails) => dispatch(addNewPatient(patientDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPatient);
