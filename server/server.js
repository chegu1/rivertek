const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
require('./utils/db')
const PORT = process.env.PORT || 5000;
/**Routes */
const authRoute = require('./routes/auth')



/**middlewares */
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use('/api', authRoute);


/**creating server and running on port 5000 */
app.listen(PORT, (err) => {
    if (err) return console.log(`unable to connect server because of ${err}`)
    return console.log(`server connected successfully and running on port no ${PORT}`)
})