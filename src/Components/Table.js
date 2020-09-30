import React from 'react';
import { connect } from 'react-redux';
import * as Constants from '../Constants/Constants';

function Table(props) {
  const isAvailable = () => {
    if (
      props.fname.length !== 0 &&
      props.age.length !== 0 &&
      props.place.length !== 0 &&
      props.contactnum.length !== 0 &&
      props.doctorname.length !== 0
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
            {props.fname.map((fname, i) => {
              return (
                <tr key={i}>
                  <td>{fname}</td>
                  <td>{props.age[i]}</td>
                  <td>{props.place[i]}</td>
                  <td>{props.contactnum[i]}</td>
                  <td>{props.doctorname[i]}</td>
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
    fname: state.fname,
    age: state.age,
    place: state.place,
    contactnum: state.contactnum,
    doctorname: state.doctorname,
  };
};

export default connect(mapStateToProps)(Table);
