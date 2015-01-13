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

    var _folderName = Folder.userData + '\\sizle';
    var _fileName = 'preferences.txt';
    Preferences = function () {
        /// <summary>This object can be used to read and write simple name / value pairs to a preferences file. To use it simply get the Prefernces object at app.RLM2.preferences and set some properties with a primitive value (Number, Boolean, String). Arrays and Objects are not supported. Invoke the save() function and the pairs will be written to a file. Use the read() function to get the value from the file and return a new Preferences object with the properties created from the file.</summary>
    };

    Preferences.prototype.read = function () {
        /// <summary>Read the name / values pairs from the preferences file and create them on a new Preferences object.</summary>
        /// <returns type="app.RLM2.Preferences">A Preferences object.</returns>
        var prefs = new Preferences();

        var folder = new Folder(_folderName);
        if (!folder.exists) {
            if (!folder.create()) {
                return false;
            }
        }

        var file = new File(_folderName + '\\' + _fileName);
        if (!file.open('r')) {
            return false;
        }

        var line = '';
        while (!file.eof) {
            line = file.readln();
            if (line === null || line.length < 1) {
                continue;
            }

            var eqIndex = line.indexOf('=', 0);
            if (eqIndex < 0) {
                continue;
            }

            var name = line.slice(0, eqIndex);
            if (name.length < 1) {
                continue;
            }

            var value = line.slice(eqIndex + 1);
            prefs[name] = value;
        }

        app.RLM2.preferences = prefs;
        return prefs;
    };

    Preferences.prototype.save = function () {
        /// <summary>Save the properties on the app.RLM2.preferences object as name / values pairs in a file.</summary>
        /// <returns type="Boolean">True if the save succeeds.</returns>
        var prefs = '';
        for (var property in this) {
            if (this.hasOwnProperty(property)) {
                prefs += (property + '=' + this[property] + '\r\n');
            }
        }

        var folder = new Folder(_folderName);
        if (!folder.exists) {
            if (!folder.create()) {
                return false;
            }
        }

        var file = new File(_folderName + '\\' + _fileName);
        if (!file.open('w')) {
            return false;
        }

        file.write(prefs);
        file.close();
        return true;
    };

    app.RLM2.preferences = new Preferences();

}
)();