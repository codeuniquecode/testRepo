const express = require('express');

const app = express();
require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public/'));
app.use(express.static('./storage/'));
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('./middleware/multerConfig').multer;
const storage = require('./middleware/multerConfig').storage;
const upload = multer({storage:storage});

const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret:process.env.SECRETKEY,
    resave:false,
    saveUninitialized:false
}))
const port = process.env.port;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('./model/index');
const admin = require('./model/adminSchema');
const adminRoutes = require('./routes/adminRoutes');
app.use('/',adminRoutes);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});