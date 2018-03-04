module.exports = function(app) {
  app.get('/image/valid/:idx.png', function(req, res) {
    const delay = req.query.delay || 0;
    setTimeout(() => res.sendFile(__dirname + '/image.png'), delay);
  });

  app.get('/image/bad/:idx.png', function(req, res) {
    const delay = req.query.delay || 0;
    setTimeout(() => res.send('Bad data'), delay);
  });

  app.get('/image/not_found/:idx.png', function(req, res) {
    const delay = req.query.delay || 0;
    setTimeout(() => res.status(404).send('Not found'), delay);
  });
};
