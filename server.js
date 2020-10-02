const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');
const slugs = require('./api/slugs');
const LogEntry = require('./models/LogEntry.js');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Routers
app.use('/slugs', slugs);
app.use('/logs', logs);

app.get('/:id', async (req, res, next) => {
    const { id: slug } = req.params;
    try{
        const url = await LogEntry.findOne({slug});
        if(url){
            const upd = await LogEntry.findOneAndUpdate({slug}, {
                $inc: {redirects: 1}
            }, {useFindAndModify: false});
            return res.redirect(url.url);
        }
        //res.status(404);
        //next(error);
    }catch(error){
        res.status(404);
        next(error);
    }
    res.json({
        message: 'shrt.fit - Simple & Short URLs'
    });
});


app.get('/', (req, res) => {
    res.json({
        message: '🌎',
    });
});


// Error middlewares...
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});