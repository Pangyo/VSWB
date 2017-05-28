
module.exports.viewRender = function (req, res) {
    console.log('user : ', req.user);
    res.render('charts', {
        user: req.user
    });
}