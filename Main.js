/// <reference path="ResizeModel.js" />

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

#strict on
#target Photoshop
#script "sizle"
#include Strings.js
#include Localize.js
#include Dialog.js
#include Preferences.js
#include ResizeModel.js
#include ResourceCreator.js
#include ResizeView.js

<javascriptresource>
	<name>$$$/JavaScripts/sizle/Menu=sizle...</name>
	<category>RLM2</category>
</javascriptresource>

function main() {
    app.RLM2.preferences.setPreferencesFolder ('sizle');

    var model = new app.RLM2.ResizeModel();
    model.init();

	var view = new app.RLM2.ResizeView();
	view.setModel(model);

	view.show();

	model.exit(true);
}

main();
