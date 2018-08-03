if(process.env.NODE_ENV==="development"){
    module.exports = require('../config/dev.env');
}else{

    const { PORT, MONGODB_CONNECTION, MONGODB_DATABASE} = process.env;
    const configs = require('../config/prod.env');

    module.exports = {
        port : PORT || configs.port,
        mongodb_connection : MONGODB_CONNECTION || configs.mongodb_connection,
        mongodb_database : MONGODB_DATABASE || configs.mongodb_database
    };
}
