# tiffanyandkelvin

This is my [wedding website](https://tiffanyandkelvin.firebaseapp.com) with an RSVP system using Firebase's realtime database.

If you want to use it for your own wedding, go ahead. Just change the pictures please. Otherwise it will be weird.

## Getting Started

### Prerequisities

You will need a Firebase account and project to use the RSVP system of this project. Set up one [here](https://firebase.google.com/) 

### Installing

After cloning to repo, just run npm install

```
npm install
```

then to start developing

```
npm run lite
```

change the Firebase init script tag in index.html to your own Firebase project

```
<script>
  // Initialize Firebase
	var config = {
	apiKey: "YOUROWNFIREBASEAPIKEY",
	authDomain: "your-firebase-project-name.firebaseapp.com",
	databaseURL: "https://your-firebase-project-name.firebaseio.com",
	storageBucket: "firebase-your-firebase-project-name.appspot.com"
	};
	firebase.initializeApp(config);
</script>
```

## Running the tests

You can run the unit test

```
npm run test
```

## Deployment

If you want to host it on Firebase, make sure you set up [hosting](https://firebase.google.com/docs/hosting/) first.

```
npm run deploy
```

This will create a build using gulp in the dist folder, and then deploy it to Firebase.

## Built With

* Urip Landing Page template
* AngularJS
* Firebase
* Google APIs (Maps and Calendar)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
