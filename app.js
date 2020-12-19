const express = require('express');

const hbs = require('hbs');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:foo', (req, res) => {
  const name = req.params.foo;
  switch (name) {
    case 'beers':
      punkAPI
        .getBeers()
        .then(beersFromApi => {
          res.render('beers', { beersList: beersFromApi });
        })
        .catch(error => console.log(error));

      break;
    case 'random-beers':
      punkAPI
        .getRandom() 
        //returns an array with 1 object!
        .then(randomBeerFromApi => {
          console.log(randomBeerFromApi);
          res.render('random-beers', {
          randomBeerFromApi: randomBeerFromApi[0]
          });
        })
        .catch(error => console.log(error));
      break;
    default:
      res.render('index');
  }
});

app.listen(3100, () => console.log('🏃‍ on port 3100'));
