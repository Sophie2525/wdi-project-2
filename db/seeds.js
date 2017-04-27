const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const env        = require('../config/env');

const User       = require('../models/user');
const Venue      = require('../models/venue');

mongoose.connect(env.db, () => {
  console.log('Connected');
});

User.collection.drop();
Venue.collection.drop();

User
.create([
  {
    username: 'John Doe',
    email: 'John.doe@johndoe.com',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'Jane Doe',
    email: 'Jane.Doe@janedoe.com',
    password: 'password',
    passwordConfirmation: 'password'
  }
])
.then((users) => {
  console.log(`${users.length} users created!`);

  return Venue
  .create([
    {
      title: 'World Cup Opener',
      description: 'England fans before England took on France',
      image: 'http://i.imgur.com/EFZU2Y7.jpg',
      location: 'Stade de Moncton',
      lat: '46.095978',
      lng: '-64.760720'
    }, {
      title: 'A Canadian Sunset',
      description: 'Sunset in the picturesque Riviere-du-Loup',
      image: 'http://i.imgur.com/3jHF6Oc.jpg',
      location: 'Riviere du Loup',
      lat: '47.835957',
      lng: '-69.535985'
    }, {
      title: 'England v Colombia',
      description: 'England fans in full song against Colombia',
      image: 'http://i.imgur.com/D1b34Lj.jpg',
      location: 'Bell Centre, Montreal',
      lat: '45.496067',
      lng: '-73.569315'
    }, {
      title: 'Staring up at some sheep',
      description: 'Admiring the street art in Montreal',
      image: 'http://i.imgur.com/lAWkqdZ.jpg',
      location: 'Gay Village, Montreal',
      lat: '45.521289',
      lng: '-73.557980'
    }, {
      title: 'The Sweetest Victory',
      description: 'When England beat Canada in their own backyard',
      image: 'http://i.imgur.com/3zWsYlO.jpg',
      location: 'BC Place, Vancouver',
      lat: '49.276750',
      lng: '-123.111999'
    }, {
      title: 'Across the Salish Sea',
      description: 'Enjoying the Vancouver ferry views',
      image: 'http://i.imgur.com/33oGhgW.jpg',
      location: 'Vancouver Island',
      lat: '49.165884',
      lng: '-123.940065'
    }, {
      title: 'Along the crisp water',
      description: 'A beautiful lunch on the harbour',
      image: 'http://i.imgur.com/ytrJ8mY.jpg',
      location: 'Vancouver',
      lat: '49.282729',
      lng: '-123.120738'
    }]);
})
  .then(venues => {
    venues.forEach(venue => {
      venue
      .save(venue, (err, venue) => {
        if(err) return console.log(err);
        return console.log(`${venue.title} was created`);
      });
    });
  });
