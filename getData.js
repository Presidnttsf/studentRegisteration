const axios = require('axios')

const URL = "http://localhost:5000/getstudents";

const getData = async () => {
  const resp = await axios.get(URL)
const students = resp.data
console.log(students.map(item => (` id: ${item._id} name: ${item.name}` )));

console.log(students.length)
};

getData();