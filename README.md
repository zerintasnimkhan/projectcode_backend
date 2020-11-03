# Chat server

It’s time to move to the back-end side of the force! The chat client you created needs to be paired with its server counterpart.

This project is divided in 3 steps, aim to complete one section per day. For each section use the respective folder in the `/server` directory, and save the required dependencies in the global `package.json`.

Finally, use [Nodemon](https://github.com/remy/nodemon) it will make your life much easier.

### Bare Node

Check out the difference between [blocking and non-blocking code](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/), and read the [anatomy of an HTTP transaction](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/). Then take a moment to get familiar with the Node JS docs. At first it looks more cryptic than other documentation you’ve seen before, but as always it’s just a matter of getting used to it. Here’s [an example](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback), make sure you can fully understand it before moving forward (if you get stuck ask for help).

- Following [this template](https://nodejs.org/api/synopsis.html) create an `index.js` file that contains a basic Node server running on port `3000`. and responds `'Hello world'` to any request it receives.

- In the same file, create a basic router that serves static assets from the `/client` folder (for this you’ll need to use some regex combined with the [Node file system API](https://nodejs.org/api/fs.html)), and check that your client correctly loads in the browser.

- Create a simple data store on your server, which acts as a rudimentary database, and is composed of two parts:
  - An in-memory JS object (e.g. `const db = {msgs: []}`) that stores all your chat messages.
  - A `data.json` file on disk, where you dump and persist all those in-memory messages every five seconds. [Config Nodemon](https://github.com/remy/nodemon#config-files) so that it ignores changes to this file (to avoid continuous reloading), and use [`.gitignore`](https://git-scm.com/docs/gitignore) to exclude the file from your respository (you don’t want the messages data to be part of the app code).

- Your server should expose the following REST API (use [Postman](https://www.getpostman.com/) for testing):
  - `/message GET` - Get all the messages
  - `/message POST` - Post a message

  For the `POST` route to work you need to create a request [body parser](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#request-body).

- Any request for a non-existing route should return a `404` HTTP code.

- Modularity is a key concept in Software Engineering. So, now take this monstrous complex file you have created, and divide it in 4 modules that are responsible for each part.

  - `index.js` - Server bootstrap
  - `body-parser.js` - Middleware that parses the body of POST requests
  - `router.js` - Contains all your routing code
  - `db.js` - Where you keep your storage logic

- Finally modify your client so that:
  - When it loads, it gets all messages from the server.
  - Each time a new message is written, it posts it to the server.

If all the above has been implemented correctly, you should now be able to reload the client (or open a new one in another browser tab) and see all the previous messages. Rejoice!

### Express

Would you like to be able to do all of this much faster? If so, you’re ready to meet your first back-end framework! Take a look at the [Express docs](https://expressjs.com/), and become familiar with the five components of its [API](https://expressjs.com/en/4x/api.html) (express, application, request, response, and router).

- Then recreate your server using Express (start from [this template](https://expressjs.com/en/starter/hello-world.html)).
- After you’re done with the transition, refactor your architecture to follow an [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern. In this case you only need the “M” and “C” part (since your “V” is directly rendered in the client).

### Koa

Directly from the creators of Express, meet its successor: Koa. Before diving into it, make sure you feel comfortable using different async code patterns by completing the [async-exercise](https://github.com/codeworks/async-exercise).

- Now, check out [the docs](http://koajs.com/), and compare where Koa differs from Express.
- Finally rebuild your server, taking advantage of the new APIs.

## Getting started

To install the required dependencies run `npm install`.

Now copy all the files you had in the `/app` folder of the `chat-client` repo into the `/client` folder of this repo.

You’re ready to go! Remember to make small, incremental, and descriptive commits along the way.

## Extra credits

- Add unit tests for each version of your server, using [Jest](https://jestjs.io/) as a [dev-dependency](https://docs.npmjs.com/cli/install) (read the docs and see how it works).
