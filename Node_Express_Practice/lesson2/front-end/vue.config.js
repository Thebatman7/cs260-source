module.exports = {
  /*
  We're going to be running a server for the front end at localhost:8080 and a server 
  for the back end at localhost:3000. This will cause CORS errors! CORS is designed to make
  sure that if your browser is currently visiting amazon.com, it can't also make a request to 
  stealmycreditcard.com, a site controlled by an attacker.

  In our case, we control both of these websites, and need to ensure that our front end
  server can talk to the back end server. We do this by creating a file in front-end/vue.config.js.
  This configures the server that the Vue CLI starts to proxy requests for the back end.
  This will tell it to send any request it doesn't handle to the back end server.
  */
  devServer: {
    proxy: 'http://localhost:3000',
  }
}
