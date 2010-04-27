function onDashboardLoaded(dashboard, options) {
  var require = Require.build();

  // Needed for Firebug, which won't log iframe errors to the console.
  $(dashboard).error(
    function(event) {
      console.warn("An error occurred in the dashboard iframe.");
    });

  var moduleExports = {};
  var dbrequire = dashboard.Require.build(dashboard.Require.modules,
                                          moduleExports);
  options.cache = require("mocks/cache").create();
  options.Bugzilla = require("mocks/bugzilla").create(options.Bugzilla);
  dbrequire("date-utils").now = function() {
    return new Date("Tue Apr 27 2010 09:00:00 GMT");
  };
  dbrequire("app/loader").init(moduleExports, options);
}

$(window).ready(
  function() {
    var iframe = $("#dashboard").get(0);
    iframe.src = "index.html?testing=1";
  });