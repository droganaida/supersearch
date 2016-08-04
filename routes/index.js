module.exports = function(app){

    app.get('/', require('./main').get);
    app.post('/', require('./main').post);

}