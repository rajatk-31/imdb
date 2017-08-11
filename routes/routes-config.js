module.exports = function(app) {
    app.use('/api/actor', require('./actor'));
}