// require modules needed
var    express = require('express'),
    bodyParser = require('body-parser'),
        logger = require('morgan'),
            SC = require('node-soundcloud')
          port = process.env.Port || 3000,
           app = express(),
           ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts'),
    configAuth = require('./config/auth.js')
     apiRouter = express.Router()

// middleware
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// make files inside public accessible 
app.use(express.static(__dirname + '/public'))

// use ejs and express-ejs-layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// set root route
app.get('/',function(req, res) {
  res.render('index')
})

// authentication for soundcloud
SC.init({
  id: configAuth.soundcloudAuth.id,
  secret: configAuth.soundcloudAuth.secret,
  uri: configAuth.soundcloudAuth.uri,
  accessToken: configAuth.soundcloudAuth.accessToken
});

// set routes for post request for /search
app.post('/search',(function(req, res) { // when a post request is made to /search
  // make a get request to soundcloud using the input value of "search"
  SC.get('/tracks', {q: req.body.search}, function(err, tracks){
    if (err) { // if err, then direct user to index to fill out the form again
      console.log(err)
      res.render('index')
    } else {
      // if soundcloud returns results, then randomly pick one out of the 10
      var random = Math.floor((Math.random() * tracks.length))
      var track = tracks[random]
      // render show page to play the selected track
      res.render('show', {tracks: tracks, track: track})
    }
  })
}))

// create server
app.listen(port)
