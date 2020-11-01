export default function addNewPatient(value) {
  console.log('value::',value)
  return {
    type: 'ADD_NEW',
    patient:value
  };
}
