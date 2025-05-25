const mongoose = require('mongoose');
mongoose.connect(process.env.connection_string).then(()=>{
    console.log('Database connected successfully');
}).catch((err)=>{
    console.log('Database connection failed', err);
}
);