# car-rental

Consumes the Smove availability API resource.

Users are able to choose the start time and end time.
The system will display the locations of all the available cars in clusters.

The markers show the number of cars per location, users are also able to
 click the markers to display the route from the chosen marker to the first drop-off location.
 
Best displayed on a mobile device.

The system is also capable of caching the data from the api resource. It will use the cache if user uses same start
and end time.

## Project setup
```
npm install
```

## Environment variable setup
```
VUE_APP_GOOGLE_MAPS_API_KEY=""
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
