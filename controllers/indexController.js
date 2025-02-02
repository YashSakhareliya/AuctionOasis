const renderIndex = (req, res) => {
    res.render('index', { username: res.locals.username });
};
  

module.exports = { renderIndex };
  