export default function addNewPatient(value) {
  return {
    type: 'ADD_NEW',

    name: value.fname,
    age: value.age,
    place: value.place,
    contactnum: value.contactnum,
    doctorname: value.doctorname,
  };
}
