/// <reference path="Strings.js" />

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

    function getPath(path, additional) {
        /// <summary>Get an array with property names to the Dialog's string locations.</summary>
        /// <param name="path" type="Array" elementType="String">Strings that make up the path.</param>
        /// <param name="additional" type="Array" elementType="String">Additional parts to add on the end of the path.</param>
        var arr = ['Dialog'];
        arr.push.apply(arr, path.slice(0));
        if (typeof additional !== 'undefined' && additional !== null && 0 < additional.length) {
            arr.push.apply(arr, additional);
        }
        return arr;
    }

    app.RLM2.Dialog = function (path) {
        /// <summary>Information used to display a dialog.</summary>
        /// <param name="path" type="Array" elementType="String">An Array of strings that define the property names from app.RLM2.Strings.Dialog to get localized string information.</param>
        this._type = 'alert';
        this._path = path;
        this._title = null;
        this._message = null;
    };

    app.RLM2.Dialog.prototype.getType = function () {
        return this._type;
    }

    app.RLM2.Dialog.prototype.getTitle = function () {
        /// <summary>Get a dialog's title information.</summary>
        /// <returns type="app.RLM2.Localize">Information about the title.</returns>
        if (this._title === null) {
            this._title = new app.RLM2.Localize(getPath(this._path, ['title']));
        }
        return this._title;
    }

    app.RLM2.Dialog.prototype.getMessage = function () {
        /// <summary>Get a dialog's message information.</summary>
        /// <returns type="app.RLM2.Localize">Information about the message.</returns>
        if (this._message === null) {
            this._message = new app.RLM2.Localize(getPath(this._path, ['message']));
        }
        return this._message;
    }

    app.RLM2.Dialog.prototype.setReplacements = function (messageReplacements, titleReplacements) {
        /// <summary>Get a dialog's message information.</summary>
        /// <param name="messageReplacements" type="Array" elementType="String" optional="true">Replacements for the message string.</param>
        /// <param name="titleReplacements" type="Array" elementType="String" optional="true">Replacements for the title string.</param>
        /// <returns type="app.RLM2.Dialog">The same Message (for function chaining).</returns>
        this._message = new app.RLM2.Localize(getPath(this._path, ['message']), messageReplacements);
        this._title = new app.RLM2.Localize(getPath(this._path, ['title']), titleReplacements);
        return this;
    }
})();