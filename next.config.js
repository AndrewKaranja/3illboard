
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/react",
  "@fullcalendar/interaction",
  
]);
module.exports = withTM({
  reactStrictMode: true,
  images:{
    domains:['links.papareact.com','firebasestorage.googleapis.com']
  }
});
