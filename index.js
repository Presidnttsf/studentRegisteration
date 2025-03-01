const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 5000;
app.use(cors())


//get data from the server
app.get('/students', (req, res) => {
    res.json([{ name: 'John Doe', age: 20 }, { name: 'vinit', age: 22 }]);
  });




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
