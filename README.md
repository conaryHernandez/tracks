# Tracks

A Restful API using NodeJS and Express, and a client that feeds the data from the tracks API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Yarn - [Download & Install Yarn](https://yarnpkg.com/en/docs/install#windows-stable) and the npm package manager.

### Installing the API

A step by step series of examples that tell you how to get a development env running for the API. First go the API directory and then do:

```
yarn install
yarn start
```

App starts running

Open [http://localhost:3030](http://localhost:3030) to see the app.

## Running the tests

```
yarn test
```

### Installing the client

A step by step series of examples that tell you how to get a development env running for the client side. First go the client directory and then do:

```
yarn install
yarn start
```

App starts running

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Running the tests

```
yarn test
```

## Deployment

Run **yarn build** in order to create a build folder with the compiled assets ready to deploy to your server.

```
yarn build
```

### Layout

Once your app is running you will see the Home page of the app.

<img src="/images/home.png" alt="Home Page">

You can see the list of tracks avaible for this data.
When you click the "Details" button the following modal will appear. You can check the track title and the artist.

<img src="/images/tracks-modal.png" alt="Tracks Modal">

You can close it by clicking the "OK" button or the "Cancel" button.

If you there is no tracks available you will se the following message

<img src="/images/no-tracks.png" alt="Empty List">

## Built With

API:

- [Nodejs](https://nodejs.org/en/) - The JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js

Client:

- [React](https://reactjs.org/) - The Web Framework.
- [Redux](https://react-redux.js.org/) - The Sate Management library.
- [Yarn](https://yarnpkg.com) - Dependency Management
- [Antd](https://rometools.github.io/rome/) - Used to create UI Elements

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

- Kyle Simpson
- Dan Abramov
