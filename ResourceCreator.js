/// <reference path="Strings.js" />
/// <reference path="Localize.js" />

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

    function createPropertiesResourceString(properties, trimLeadingComma) {
		if (properties === null || typeof properties === 'undefined') {
			return '';
		}

		trimLeadingComma = typeof trimLeadingComma === 'undefined' ? false : trimLeadingComma;

		var p = '';
		if (typeof properties.visible !== 'undefined') {
			p += ',visible:' + properties.visible;
		}
		if (typeof properties.bounds !== 'undefined') {
			p += ',bounds:' + properties.bounds;
		}
		if (typeof properties.margins !== 'undefined') {
			p += ',margins:' + properties.margins;
		}
		if (typeof properties.characters !== 'undefined') {
			p += ',characters:' + properties.characters;
		}
		if (typeof properties.preferredSize !== 'undefined') {
			p += ',preferredSize:' + properties.preferredSize;
		}
		if (typeof properties.spacing !== 'undefined') {
			p += ',spacing:' + properties.spacing;
		}
		if (typeof properties.alignment !== 'undefined') {
			p += ',alignment:' + properties.alignment;
		}
		if (typeof properties.orientation !== 'undefined') {
			p += ',orientation:\'' + properties.orientation + '\'';
		}
		if (typeof properties.alignChildren !== 'undefined') {
			p += ',alignChildren:' + properties.alignChildren;
		}
		if (typeof properties.truncate !== 'undefined') {
			p += ',truncate:' + properties.truncate;
		}
		if (typeof properties.enabled !== 'undefined') {
			p += ',enabled:' + properties.enabled;
		}
		if (typeof properties.value !== 'undefined') {
			p += ',value:' + properties.value;
		}

		if (trimLeadingComma && 0 < p.length) {
			p = p.substr(1, p.length - 1);
		}

		return p;
	}

	if (typeof app.RLM2 === 'undefined') {
		app.RLM2 = function () {};
	}

	/*
	Create resource strings using standard Javascript Objects.
	@constructor
	*/
	app.RLM2.ResourceCreator = function () {};

	/*
	Generate a resource string to create a Button control.
	@param {String} name - The name of the property that can be used to access the Button after it is created.
	@param {String} text - Text to be displayed on the Button.
	@param {Object} properties - An object with properties and values that can be converted into Control properties (see: createPropertiesResourceString).
	@returns {String} A resource specification describing a Button control.
	*/
	app.RLM2.ResourceCreator.prototype.createButtonResource = function (name, text, properties) {
	    var resource = name + ':Button{text:\'' + text + '\'';
	    resource += createPropertiesResourceString(properties);
	    resource += '}';
	    return resource;
	};

	app.RLM2.ResourceCreator.prototype.createRadioButtonResource = function (name, localizeObject, properties) {
	    ///<summary>Generate a resource string to create a RadioButton control.</summary>
	    ///<param name="name" type="String">The name of the property that can be used to access the RadioButton after it is created.</param>
	    ///<param name="localizeObject" type="app.RLM2.Localize">Text to be displayed next to the RadioButton.</param>
	    ///<param name="properties" type="Object">An object with properties and values that can be converted into Control properties (see: createPropertiesResourceString).</param>
	    ///<returns type="String">A resource specification describing a RadioButton control.</returns>
	    return name + ':RadioButton{text:\'' + localizeObject.toLocalizedString() + '\'' + createPropertiesResourceString(properties) + '}';
	};

	/*
	Generate a resource string to create a StaticText control.
	@param {String} name - The name of the property that can be used to access the StaticText after it is created.
	@param {String} text - Text to be displayed in the StaticText.
	@param {Object} properties - An object with properties and values that can be converted into Control properties (see: createPropertiesResourceString).
	@returns {String} A resource specification describing a StaticText control.
	*/
	app.RLM2.ResourceCreator.prototype.createStaticTextResource = function (name, text, properties) {
	    var resource = name + ':StaticText{text:\'' + text + '\'';
	    resource += createPropertiesResourceString(properties);
	    resource += '}';
	    return resource;
	};

	/*
	Generate a resource string to create an EditText control.
	@param {String} name - The name of the property that can be used to access the EditText after it is created.
	@param {String} text - Text to be displayed in the EditText.
	@param {Object} properties - An object with properties and values that can be converted into Control properties (see: createPropertiesResourceString).
	@returns {String} A resource specification describing an EditText control.
	*/
	app.RLM2.ResourceCreator.prototype.createEditTextResource = function (name, text, properties) {
	    var resource = name + ':EditText{text:\'' + text + '\'';
	    resource += createPropertiesResourceString(properties);
	    resource += '}';
	    return resource;
	};

	/*
	Generate a resource string to create a Group control.
	@param {String} name - The name of the property that can be used to access the Group after it is created.
	@param {Object} properties - An object with properties and values that can be converted into Control properties (see: createPropertiesResourceString).
	@param {...String} [child] - A resource string describing a control that is a child of the Group. Zero or more child parameters can be provided.
	@returns {String} A resource specification describing a Group control.
	*/
	app.RLM2.ResourceCreator.prototype.createGroupResource = function (name, properties, child) {
	    var resProperties = createPropertiesResourceString(properties, true);
	    var resChildren = '';
	    for (var i = 2; i < arguments.length; i++) {
	        resChildren += ',' + arguments[i];
	    }
	    if (resProperties.length < 1 && 0 < resChildren.length) {
	        resChildren = resChildren.substr(1, resChildren.length - 1);
	    }

	    return name + ':Group{' + resProperties + resChildren + '}';
	};

	/*
	Generate a resource string to create a Panel control.
	@param {String} name - The name of the property that can be used to access the Panel after it is created.
	@param {app.RLM2.Localize} localizeProperties - An object with properties and values that can be converted into a localized string (see: RLM2.Strings.localize).
	@param {Object} properties - An object with properties and values that can be converted into Control properties (see: createPropertiesResourceString).
	@param {...String} [child] - A resource string describing a control that is a child of the Panel. Zero or more child parameters can be provided.
	@returns {String} A resource specification describing a Group control.
	*/
	app.RLM2.ResourceCreator.prototype.createPanelResource = function (name, localizeObject, properties, child) {
	    var resProperties = createPropertiesResourceString(properties);
	    var resChildren = '';
	    for (var i = 3; i < arguments.length; i++) {
	        resChildren += ',' + arguments[i];
	    }

	    return name + ':Panel{text:\'' + localizeObject.toLocalizedString() + '\'' + resProperties + resChildren + '}';
	};

	/*
	Generate a resource string to create a dialog Window.
	@param {String} text - Text to be displayed in the Window's title bar.
	@param {Object} properties - An object with properties and values that can be converted into Control properties (see: createPropertiesResourceString).
	@param {...String} [child] - A resource string describing a control that is a child of the Window. Zero or more child parameters can be provided.
	@returns {String} A resource specification describing a Window.
	*/
	app.RLM2.ResourceCreator.prototype.createDialogResource = function (text, properties, child) {
	    var resProperties = createPropertiesResourceString(properties);
	    var resChildren = '';
	    for (var i = 2; i < arguments.length; i++) {
	        resChildren += ',' + arguments[i];
	    }
	    return 'dialog{properties:{resizeable:false},text:\'' + text + '\'' + resProperties + resChildren + '}';
	};

})();