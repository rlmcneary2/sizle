(function () {
    window.UnitValue = function (value, units) {
        /// <summary>Create with the specified value and units.</summary>
        /// <param name="value" type="Number">The value.</param>
        /// <param name="units" type="String">The units specifying the value, like "px" or "in".</param>
    };
    window.UnitValue.prototype.as = function (units) {
        /// <summary>Numeric length in the requested units.</summary>
        /// <param name="units" type="String">The units to get the length in, like "px" or "in".</param>
        /// <returns type="Number">The length.</returns>
    };

    window.PhotoshopDocument = function () {
        Object.defineProperty(this, "height", {
            enumerable: true,
            configurable: false,
            writable: false,
            value: new window.UnitValue()
        });
        Object.defineProperty(this, "layers", {
            enumerable: true,
            configurable: false,
            writable: false,
            value: []
        });
        Object.defineProperty(this, "resolution", {
            enumerable: true,
            configurable: false,
            writable: false,
            value: 72
        });
        Object.defineProperty(this, "width", {
            enumerable: true,
            configurable: false,
            writable: false,
            value: new UnitValue()
        });
    };
    window.PhotoshopDocument.prototype.resizeImage = function (width, height, resolution, resampleMethod) {
        /// <summary>Resize an image.</summary>
        /// <param name="width" type="UnitValue">The resized width of the image.</param>
        /// <param name="height" type="UnitValue">The resized height of the image.</param>
        /// <param name="resolution" type="Number" optional="true">The DPI of the image.</param>
        /// <param name="resampleMethod" type="Number" optional="true">One of the constants that defines a resample method.</param>
    };

    window.PhotoshopApplication = function () { };
    PhotoshopApplication.prototype.activeDocument = new PhotoshopDocument();
    PhotoshopApplication.prototype.documents = [];

    window.app = new PhotoshopApplication();
})();