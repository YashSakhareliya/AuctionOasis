const renderIndex = (req, res) => {
    res.render('index', { title: 'Home' });
};
  
module.exports = { renderIndex };
  