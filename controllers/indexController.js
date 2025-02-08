const renderIndex = (req, res) => {
    res.render('index', { messages: req.flash() });
};
  

module.exports = { renderIndex };
  