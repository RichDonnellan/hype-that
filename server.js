var    express = require('express'),
    bodyParser = require('body-parser'),
        logger = require('morgan'),
            SC = require('node-soundcloud')
          port = process.env.Port || 3000,
           app = express(),
           ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts'),
     apiRouter = express.Router()


app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static('/public'))

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

app.post('/search',(function(req, res) {
    SC.get('/tracks', {q: req.body.search}, function(err, tracks){
      if (err) {
        console.log(err)
        res.render('index')
      }
      else {
        var random = Math.floor((Math.random() * tracks.length))
        var track = tracks[random]
                console.log(track)
        res.render('show', {tracks: tracks, track: track})
      }
    })
  }))



app.listen(port)
