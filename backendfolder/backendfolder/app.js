const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const authjwt = require('./hepler/jwt.js');
require('dotenv/config');


app.use(cors());
app.options('*', cors());
// app.use(authjwt());
 
//middleware
app.use(bodyparser.json());

//routes
const categoryroutes = require('./routes/category');
const subcategoryroutes = require('./routes/subcategory');
const productroutes = require('./routes/products');
const productsizeroutes = require('./routes/productsize');
const userroutes = require('./routes/user');
const cart = require('./routes/cart.js');

app.use(`/api/category`, categoryroutes);
app.use(`/api/subcategory`, subcategoryroutes);
app.use(`/api/products`, productroutes);
app.use(`/api/productsize`, productsizeroutes);
app.use(`/api/user`, userroutes);
app.use(`/api/cart`, cart); 

//database
mongoose.connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('database connected')
    //server
    app.listen(process.env.PORT, () => {
        console.log('server is running on port ' + process.env.PORT);
    })
}).catch((err) => {
    console.log(err);
})

