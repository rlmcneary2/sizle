// This file is part of sizle.

// sizle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// sizle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with sizle.  If not, see <http://www.gnu.org/licenses/>.

(function () {

    if (typeof app.RLM2 === 'undefined') {
        app.RLM2 = function () { };
    }

    app.RLM2.Localize = function (path, replacements) {
        /// <summary>An object with information that can be used to generate a localized string.</summary>
        this._path = path;
        this._replacements = replacements
    };

    // The Object that contains ExtendScript localization objects. The 'path' parameter of the constructor will start from this point.
    app.RLM2.Localize.rootStringObject = null;

    app.RLM2.Localize.prototype.getPath = function () {
        /// <summary>Get an Array of strings that define the property names from app.RLM2.Strings to get localized string information.</summary>
        /// <returns type="Array" elementType="String">Property names.</returns>
        if (typeof this._path === 'undefined' || this._path === null) {
            this._path = [];
        }
        return this._path;
    }

    app.RLM2.Localize.prototype.getReplacements = function () {
        /// <summary>Strings that will be used as replacements in the string. These must be localized strings.</summary>
        /// <returns type="Array" elementType="String">Replacement strings.</returns>
        if (typeof this._replacements === 'undefined' || this._replacements === null) {
            this._replacements = [];
        }
        return this._replacements;
    }

    app.RLM2.Localize.prototype.toArguments = function () {
        var obj = app.RLM2.Localize.rootStringObject;
        var path = this.getPath();
        for (var i = 0; i < path.length; i++) {
            obj = obj[path[i]];
        }

        var arr = [obj];

        var replacements = this.getReplacements();
        for (var i = 0; i < replacements.length; i++) {
            arr.push(replacements[i]);
        }

        return arr;
    }

    app.RLM2.Localize.prototype.toLocalizedString = function () {
        /// <summary>Get a displayable string.</summary>
        /// <returns type="String">A localized string.</returns>
        return localize.apply(Application, this.toArguments());
    }
})();