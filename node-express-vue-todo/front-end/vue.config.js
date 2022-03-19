/*We need to tell the front end to send API reqhests to the back end.*/
module.exports = {
    devServer: {
      proxy: 'http://localhost:3000',
    }
}