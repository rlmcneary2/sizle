/// <reference path="Dialog.js" />

// This file is part of PS Resize.

// PS Resize is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// PS Resize is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with PS Resize.  If not, see <http://www.gnu.org/licenses/>.

(function () {

	if (typeof app.RLM2 === 'undefined') {
		app.RLM2 = function () {};
	}

	app.RLM2.Localize.rootStringObject = app.RLM2.Strings;

	function hasActiveDocument() {
	    if (app.documents.length < 1) {
	        return false;
	    }

	    var active = true;
	    try {
	        active = typeof app.activeDocument !== 'undefined' && app.activeDocument !== null;
	    }
	    catch (ex) {
	        active = false;
	    }

	    return active;
	}

	function validateDestination(model) {
	    /// <summary>Validate appropriate destination choices have been made by the user. If invalid sets an error message.</summary>
	    /// <param name="model" type="app.RLM2.ResizeModel">The model associated with the destination.</param>
	    /// <returns type="Boolean">True if the user choices are valid, false if they are invalid and image files can't be saved.</returns>
	    if (model.getDestinationType() === app.RLM2.ResizeModel.DestinationExistingFile) {
	        return true;
	    }

	    var folder = model.getDestinationFolder();
	    if (folder === null) {
	        model.setLastDialog(new app.RLM2.Dialog(['noDestinationFolderSelected']));
	        return false;
	    }

	    return true;
	}

	function resizeDocument(model, document) {
	    /// <summary>Resize a document.</summary>
	    /// <param name="model" type="app.RLM2.ResizeModel">The model associated with the resize task.</param>
	    /// <param name="document" type="PhotoshopDocument">The document to be resized.</param>
	    /// <returns type="Boolean">Success or failure.</returns>
	    var success = true;
	    try {
	        var wPixels = document.width.as('px');
	        var hPixels = document.height.as('px');
	        var w = -1;
	        var h = -1;
	        if (hPixels <= wPixels) {
	            w = model.getMaxDimensionLength();
	            h = (hPixels * model.getMaxDimensionLength()) / wPixels;
	        }
	        else {
	            w = (wPixels * model.getMaxDimensionLength()) / hPixels;
	            h = model.getMaxDimensionLength();
	        }

	        document.resizeImage(new UnitValue(w, 'px'), new UnitValue(h, 'px'), document.resolution, model.getResampleMethod());
	    }
	    catch (ex) {
	        success = false;
	    }

	    return success;
	}

	function saveDocument(model, document) {
	    /// <summary>Save a document.</summary>
	    /// <param name="model" type="app.RLM2.ResizeModel">The model associated with the task.</param>
	    /// <param name="document" type="PhotoshopDocument">The document to be saved.</param>
	    /// <returns type="Boolean">Success or failure.</returns>
	    var success = true;
	    try {
	        var destinationFile = null;
	        if (model.getDestinationType() === app.RLM2.ResizeModel.DestinationNewFile) {
	            var destinationFolder = model.getDestinationFolder();
	            if (destinationFolder === null) {
	                return;
	            }
	            var count = 1;
	            var folder = destinationFolder.absoluteURI;
	            var fName = document.fullName.name;
	            var parts = fName.split('.');
	            var file = parts.shift();
	            while (1 < parts.length) {
	                file += ('.' + parts.shift());
	            }
	            var ext = parts.pop();
	            var fileName = folder + '/' + file + '-' + count + '.' + ext;
	            destinationFile = new File(fileName);
	            while (destinationFile.exists) {
	                count++;
	                fileName = fileName = folder + '/' + file + '-' + count + '.' + ext;
	                destinationFile = new File(fileName);
	            }

	            // TODO allow the quality options to be set.
	            var opts = new JPEGSaveOptions();
	            opts.embedColorProfile = true;
	            opts.quality = 9;
	            document.saveAs(destinationFile, opts, true, Extension.LOWERCASE);
            }
	        else {
	            document.save();
	        }
	    }
	    catch (ex) {
	        alert(ex);
	        success = false;
	    }

	    return success;
	}

	function raiseModelPropertyChanged(model, propertyName, callbacks) {
		for (var i = 0; i < callbacks.length; i++) {
			callbacks[i](model, propertyName);
		}
	}


    /* ResizeModel */
	app.RLM2.ResizeModel = function () {
		this._applicationName = 'sizle';
		this._applicationVersion = '0.0.1';
		this._propertyChangedCallbacks = [];
		this._lastDialog = null;
		this._source = app.RLM2.ResizeModel.SourceActiveDocument;
		this._sourceFolder = null;
		this._destination = app.RLM2.ResizeModel.DestinationNewFile;
		this._destinationFolder = null;
		this._crop = app.RLM2.ResizeModel.CropFit;
		this._resampleMethod = ResampleMethod.BICUBIC;
		this._maxDimensionLength = 1920;
	};

	app.RLM2.ResizeModel.SourceActiveDocument = 0;
	app.RLM2.ResizeModel.SourceFolder = 1;
	app.RLM2.ResizeModel.DestinationNewFile = 0;
	app.RLM2.ResizeModel.DestinationExistingFile = 1;
	app.RLM2.ResizeModel.CropFit = 0;
	app.RLM2.ResizeModel.CropFill = 1;

	app.RLM2.ResizeModel.prototype.getApplicationName = function () {
	    return this._applicationName;
	};

	app.RLM2.ResizeModel.prototype.getApplicationVersion = function () {
	    return this._applicationVersion;
	};

	app.RLM2.ResizeModel.prototype.getLastDialog = function () {
	    /// <summary>Get a dialog's message information.</summary>
	    /// <returns type="app.RLM2.Dialog">Information about the message.</param>
	    return this._lastDialog;
	};

	app.RLM2.ResizeModel.prototype.setLastDialog = function (message) {
	    /// <summary>Set a dialog's message information.</summary>
	    /// <param name="message" type="app.RLM2.Dialog">Information about the message.</param>
	    this._lastDialog = message;
	    raiseModelPropertyChanged(this, 'LastMessage', this._propertyChangedCallbacks);
	};

	app.RLM2.ResizeModel.prototype.getSourceType = function () {
	    return this._source;
	};

	app.RLM2.ResizeModel.prototype.setSourceType = function (type) {
	    this._source = type;
	    raiseModelPropertyChanged(this, 'SourceType', this._propertyChangedCallbacks);
	};

	app.RLM2.ResizeModel.prototype.getSourceFolderFileSystemName = function () {
	    /// <summary>Get the user selected source folder path in the OS path format.</summary>
	    /// <returns type="String">A folder path.</returns>
	    return this._sourceFolder !== null ? this._sourceFolder.fsName : '';
	};

	app.RLM2.ResizeModel.prototype.getSourceFolder = function () {
	    /// <summary>Get the user selected source folder.</summary>
	    /// <returns type="Object" mayBeNull="true">An Adobe Folder object.</returns>
	    return this._sourceFolder;
	};

	app.RLM2.ResizeModel.prototype.setSourceFolder = function (folder) {
	    /// <summary>Set a dialog's message information.</summary>
	    /// <param name="Folder" type="Object" mayBeNull="true">An Adobe Folder object.</param>
	    this._sourceFolder = folder;
	    raiseModelPropertyChanged(this, 'SourceFolder', this._propertyChangedCallbacks);
	};

	app.RLM2.ResizeModel.prototype.getDestinationType = function () {
	    return this._destination;
	};

	app.RLM2.ResizeModel.prototype.setDestinationType = function (type) {
	    this._destination = type;
	    raiseModelPropertyChanged(this, 'DestinationType', this._propertyChangedCallbacks);
	};

	app.RLM2.ResizeModel.prototype.getDestinationFolderFileSystemName = function () {
	    /// <summary>Get the user selected source folder path in the OS path format.</summary>
	    /// <returns type="String">A folder path.</returns>
	    return this._destinationFolder !== null ? this._destinationFolder.fsName : '';
	};

	app.RLM2.ResizeModel.prototype.getDestinationFolder = function () {
	    /// <summary>The destination folder for output files.</summary>
	    /// <returns type="Object" mayBeNull="true">An Adobe Folder object.</returns>
	    return this._destinationFolder;
	};

	app.RLM2.ResizeModel.prototype.setDestinationFolder = function (folder) {
	    /// <summary>The destination folder for output files.</summary>
	    /// <param name="Folder" type="Object" mayBeNull="true">An Adobe Folder object.</param>
	    this._destinationFolder = folder;
	    raiseModelPropertyChanged(this, 'DestinationFolder', this._propertyChangedCallbacks);
	};

	app.RLM2.ResizeModel.prototype.getResampleMethod = function () {
	    return this._resampleMethod;
	};

	app.RLM2.ResizeModel.prototype.getCropType = function () {
	    return this._crop;
	};

	app.RLM2.ResizeModel.prototype.setCropType = function (cropType) {
	    this._crop = cropType;
	    raiseModelPropertyChanged(this, 'CropType', this._propertyChangedCallbacks);
	};

	app.RLM2.ResizeModel.prototype.getMaxDimensionLength = function () {
	    return this._maxDimensionLength;
	};

	app.RLM2.ResizeModel.prototype.setMaxDimensionLength = function (maxDimensionLength) {
	    this._maxDimensionLength = maxDimensionLength;
	    raiseModelPropertyChanged(this, 'MaxDimensionLength', this._propertyChangedCallbacks);
	};

	app.RLM2.ResizeModel.prototype.addPropertyChangedCallback = function (callback) {
	    for (var i = 0; i < this._propertyChangedCallbacks.length; i++) {
	        if (this._propertyChangedCallbacks[i] == callback) {
	            return;
	        }
	    }

	    this._propertyChangedCallbacks.push(callback);
	};

	app.RLM2.ResizeModel.prototype.resize = function () {
	    if (this.getSourceType() === app.RLM2.ResizeModel.SourceActiveDocument) {
	        if (!hasActiveDocument()) {
	            this.setLastDialog(new app.RLM2.Dialog(['selectActiveFolder']));
	            return;
	        }

	        if (!validateDestination(this)) {
	            return;
	        }

	        var doc = app.activeDocument;
	        var success = resizeDocument(this, doc);
	        success = saveDocument(this, doc);
	        this.setLastDialog(new app.RLM2.Dialog(['resizeActiveDocument', (success ? 'success' : 'failure')]));
	    }
	    else {
	        if (this._sourceFolder === null || this._sourceFolder === '') {
	            this.setLastDialog(new app.RLM2.Dialog(['selectFolder']));
	            return;
	        }

	        if (!validateDestination(this)) {
	            return;
	        }

	        var fsObjects = this._sourceFolder.getFiles(function (fsObject) {
	            if (!(fsObject instanceof File)) {
	                return false;
	            }

	            var arr = fsObject.name.split('.');
	            var ext = arr[arr.length - 1];

	            return ext.toLowerCase() === 'jpg';
	        });

	        var status = [];
	        for (var i = 0; i < fsObjects.length; i++) {
	            var success = true;
	            var doc = app.open(fsObjects[i]);
	            if (typeof doc !== 'undefined' && doc !== null) {
	                try {
	                    success = resizeDocument(this, doc);
	                }
	                catch (ex) {
	                    success = false;
	                }

	                // TODO save document as new file.
	                success = saveDocument(this, doc);

	                try {
	                    doc.close(SaveOptions.DONOTSAVECHANGES);
	                }
	                catch (ex) {
	                }
	            }
	            else {
	                success == false;
	            }
	            status.push({ 'success': success, 'file': fsObjects[i].fsName });
	        }

	        var successCount = 0;
	        for (var i = 0; i < status.length; i++){
	            if (status[i].success){
	                successCount++;
	            }
	        }

	        this.setLastDialog(new app.RLM2.Dialog(['resizeSourceFolder']).setReplacements(['' + successCount, '' + fsObjects.length]));
        }
	};

})();
