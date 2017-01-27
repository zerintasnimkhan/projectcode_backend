# Chat Server

It’s time to move to the back-end side of the force! The chat client you created needs to be paired with its server counterpart. To begin, copy all the files you had in the `/app` folder from the previous repo into the `/client` folder of this repo.

This project is divided in 3 steps, aim to complete one section per day. For each section use the respective folder in the `/server` directory, and save the required dependencies in the global `package.json`.

Finally, use [Nodemon](https://github.com/remy/nodemon) it will make your life much easier.

### Bare Node

Take a moment to get familiar with the Node JS docs. At first it looks more cryptic than other documentation you’ve seen before, but as always it’s just a matter of getting used to it. Here’s [an example](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback), make sure you can fully understand it before moving forward (if you get stuck ask for help).

- Following [this template](https://nodejs.org/api/synopsis.html) create an `index.js` file that contains a basic Node server running on port `3000`. and responds `'Hello world'` to any request it receives.
- In the same file, create a basic router that serves static assets from the `/client` folder (for this you’ll need to use some regex combined with the [Node file system API](https://nodejs.org/api/fs.html)), and check that your client correctly loads in the browser.
- Create a simple data-store on your server, that is composed of two parts:
  - An in-memory JS object (e.g. `const db = {messages: []}`) that can store all your chat messages.
  - A `db.json` file on disk, where all the messages in memory are dumped and persisted every five seconds.
- Your server should expose the following REST API (use [Postman](https://www.getpostman.com/) for testing):
  - `/message GET` - Get all the messages
  - `/message POST` - Post a message
- Any request for a non-existing route should return a `404` HTTP code.
- Now modify your client so that:
  - When it loads, it gets all messages from the server.
  - Each time a new message is written, it posts it to the server.

If all the above has been implemented correctly, you should now be able to reload the client (or open a new one in another browser tab) and see all the previous messages. Rejoice!

### Express

Would you like to be able to do all of this much faster? If so, you’re ready to meet your first back-end framework! Take a look at the [Express docs](https://expressjs.com/), and become familiar with the five components of its [API](https://expressjs.com/en/4x/api.html) (express, application, request, response, and router).

- Then recreate your server using Express (start from [this template](https://expressjs.com/en/starter/hello-world.html)).
- After you’re done with the transition, refactor your architecture to follow an [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern. In this case you only need the “M” and “C” part (since your “V” is directly rendered in the client).

### Koa

Directly from the creators of Express, meet its successor: Koa. As always, start checking out [the docs](http://koajs.com/), and compare where it differs from Express.

- Now recreate your server using Koa.
- Once you’re done, get familiar with [JS promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), and switch all your async callbacks to them, “yielding” results in a synchronous fashion.

## Getting started

To install the required dependencies run `npm install`.

Now you can use `gulp lint` to check your syntax before committing. Remember to make small, incremental, and descriptive commits along the way.

## Extra credits

- Add unit tests for each version of the server. You’ll need to install [Jasmine](https://jasmine.github.io/) and save it as a [dev-dependency](https://docs.npmjs.com/cli/install) in your project (read the docs and see how it works).
