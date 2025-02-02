const renderIndex = (req, res) => {
    res.render('index', { username: res.locals.username, userId: res.locals.userId });
};
  

module.exports = { renderIndex };
  