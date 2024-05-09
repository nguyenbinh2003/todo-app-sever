const mongoose = require('mongoose');

const connectData = async () => {
    try {
        await mongoose.connect(process.env.URL).then(() => {
            console.log('Mongo connected');
        });
    } catch (error) {
        console.log(error);
        console.log('Can not connect');
    }
};

module.exports = connectData;