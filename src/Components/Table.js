import React from 'react';
import { connect } from 'react-redux';
import * as Constants from '../Constants/Constants';

function Table(props) {
  const{patient}=props;
  
  const isAvailable = () => {
    if (
      patient.length !== 0 
      
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {isAvailable() && (
        <table>
          <thead>
            <tr>
              <th>{Constants.NAME}</th>
              <th>{Constants.AGE}</th>
              <th>{Constants.PLACE}</th>
              <th>{Constants.CONTACTNUMBER}</th>
              <th>{Constants.DOCTORNAME}</th>
            </tr>
          </thead>

          <tbody>
            {patient.map((patient, i) => {
              return (
                <tr key={i}>
                  <td>{patient.fname}</td>
                  <td>{patient.age}</td>
                  <td>{patient.place}</td>
                  <td>{patient.contactnum}</td>
                  <td>{patient.doctorname}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    patient:state.patient
  };
};

export default connect(mapStateToProps)(Table);
