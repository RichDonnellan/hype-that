var    express = require('express'),
    bodyParser = require('body-parser'),
        logger = require('morgan'),
            SC = require('node-soundcloud')
          port = process.env.Port || 3000,
           app = express(),
           ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts'),
          path = require('path'),
     apiRouter = express.Router()


app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/',function(req, res) {
  res.render('index')
})

app.set('view engine', 'ejs')

SC.init({
  id: 'b0d75d37539752ace8011cf07b7e02c1',
  secret: '5233e48846667dc6da21735d9490b308',
  uri: 'http://localhost:3000/',
  accessToken: 'https://api.soundcloud.com/oauth2/token'
});

apiRouter.route('/search')
  .get(function(req, res) {
    sc.get('/tracks', {q: req.body.searchQuery}, function(err, track){
      if (track) {
        res.render('show', {track: track})
      }
      else {
        console.log('failure')
        res.render('/')
      }
    })


  })


app.listen(port)
