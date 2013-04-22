var MapBounds = (function() {

    "use strict";

    var firstCorner = new Microsoft.Maps.Location(-49.15297, 162.421875);
    var secondCorner = new Microsoft.Maps.Location(-33.431441, -178.505859);

    return { Boundary: new Microsoft.Maps.LocationRect.fromCorners(firstCorner, secondCorner) };
})();