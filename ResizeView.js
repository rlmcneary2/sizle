/// <reference path="Strings.js" />
/// <reference path="Localize.js" />
/// <reference path="ResourceCreator.js" />
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

(function () {

    function isNumberKey (keyName) {
		return '0' <= keyName && keyName <= '9';
	}

	function isKeyboardEventModifier (keyboardEvent) {
		return keyboardEvent.shiftKey || keyboardEvent.ctrlKey || keyboardEvent.altKey || keyboardEvent.metaKey;
	}
	
	function isCursorMovement (keyboardEvent) {
		return keyboardEvent.keyName === 'Backspace' || keyboardEvent.keyName === 'Left' || keyboardEvent.keyName === 'Right' || keyboardEvent.keyName === 'Tab' || keyboardEvent.keyName === 'Enter' || keyboardEvent.keyName === 'Escape';
	}

	function getLocalizeArgs(part, messageObject) {
	    var args = messageObject[part + 'Args'];
	    var properties = [];
	    properties.push.apply(properties, messageObject.strings);
	    properties.push(part);
	    return app.RLM2.Strings.localize({ 'path': properties, 'args': args });
	}

	function raiseLastMessageDialog(messageObject) {
	    /// <summary>Display a dialog based on the Model's LastMessage property.</summary>
	    /// <param name="messageObject" type="app.RLM2.Dialog">Information used to create the dialog.</param>
	    /// <returns type="String">A localized string.</returns>
	    if (messageObject.getType() === 'alert') {
	        alert(messageObject.getMessage().toLocalizedString(), messageObject.getTitle().toLocalizedString());
	    }
	}

	var _mainWindow = null;
	function getMainWindow(model) {
	    /// <summary>Get this application's main Window object or create it if necessary.</summary>
	    /// <param name="model" type="app.RLM2.ResizeModel">The model associated with this view.</param>
	    /// <returns>An ExtendScript Window object.</returns>
		if (_mainWindow !== null) {
			return _mainWindow;
		}

		var res = new app.RLM2.ResourceCreator ();
		var resource = res.createDialogResource(model.getApplicationName(), {
		    'alignChildren': '[\'fill\',\'fill\']'
		},
				/* Begin source panel */
				res.createPanelResource('sourcePanel', new app.RLM2.Localize(['MainWindow', 'sourcePanel']), {
				    'orientation': 'column',
				    'alignChildren': '[\'left\',\'center\']'
				},
					    res.createRadioButtonResource('doc', new app.RLM2.Localize(['sourcePanel', 'doc']), {
					        'value': model.getSourceType() === app.RLM2.ResizeModel.SourceTypeActiveDocument
					    }),
					    res.createRadioButtonResource('folder', new app.RLM2.Localize(['sourcePanel', 'folder']), {
					        'value': model.getSourceType() === app.RLM2.ResizeModel.SourceTypeFolder
					    }),
					    res.createGroupResource('folderGroup', {
					        'alignment': 'fill',
					        'orientation': 'row',
					        'alignChildren': '[\'center\',\'center\']'
					    },
						    res.createButtonResource('selectFolder', 'Select', {
						        'enabled': model.getSourceType() === app.RLM2.ResizeModel.SourceTypeFolder
						    }),
						    res.createStaticTextResource('sourceFolder', { 'addSlashes': true, 'text': model.getSourceFolderFileSystemName() }, {
						        'enabled': model.getSourceType() === app.RLM2.ResizeModel.SourceTypeFolder,
						        'preferredSize': '[400,-1]',
						        'truncate': 'middle'
						    })
                        )
                ),
				/* Begin destination panel */
                res.createPanelResource('destinationPanel', new app.RLM2.Localize(['MainWindow', 'destinationPanel']), {
                    'orientation': 'column',
                    'alignChildren': '[\'left\',\'center\']'
                },
                        res.createRadioButtonResource('overwriteExistingFile', new app.RLM2.Localize(['destinationPanel', 'overwriteExistingFile']), {
                            'value': model.getDestinationType() === app.RLM2.ResizeModel.DestinationExistingFile
                        }),
                        res.createRadioButtonResource('saveNewFile', new app.RLM2.Localize(['destinationPanel', 'saveNewFile']), {
                            'value': model.getDestinationType() === app.RLM2.ResizeModel.DestinationNewFile
                        }),
					    res.createGroupResource('folderGroup', {
					        'alignment': 'fill',
					        'orientation': 'row',
					        'alignChildren': '[\'center\',\'center\']'
					    },
						    res.createButtonResource('selectFolder', 'Select', {
						        'enabled': model.getDestinationType() === app.RLM2.ResizeModel.DestinationNewFile
						    }),
						    res.createStaticTextResource('destinationFolder', { 'addSlashes': true, 'text': model.getDestinationFolderFileSystemName() }, {
						        'enabled': model.getDestinationType() === app.RLM2.ResizeModel.DestinationNewFile,
						        'preferredSize': '[400,-1]',
						        'truncate': 'middle'
						    })
                        )
                ),
				/* Begin crop panel */
/*				createPanelResource('cropPanel', 'Cropping', {
					'visible' : false,
					'orientation' : 'column',
					'alignChildren' : '[\'left\',\'center\']'
				},
					createRadioButtonResource('fit', 'Fit', {
						'value' : model.getCropType() === app.RLM2.ResizeModel.CropFit
					}),
					createRadioButtonResource('fill', 'Fill', {
						'value' : model.getCropType() === app.RLM2.ResizeModel.CropFill
					})),*/
				/* Begin resize panel */
				res.createPanelResource('resizePanel', new app.RLM2.Localize(['MainWindow', 'resizePanel']), {
				    'alignChildren': '[\'fill\',\'center\']'
				},
					res.createGroupResource('proportionalGroup', {
					    'orientation': 'row'
					},
						res.createGroupResource('maxDimensionLengthLabelGroup', {
						    'alignChildren': '[\'right\',\'center\']'
						},
							res.createStaticTextResource('maxDimensionLengthLabel', 'length of maximum dimension')
						),
						res.createEditTextResource('maxDimensionLength', model.getMaxDimensionLength(), {
						    'characters': 5,
						})
					)
				),
				/* Begin button group */
				res.createGroupResource('buttonGroup', {
				    'orientation': 'row',
				    'alignChildren': '[\'fill\',\'center\']'
				},
					res.createGroupResource('buttonGroupLeft', {
					    'orientation': 'row',
					    'alignChildren': '[\'left\',\'center\']'
					},
						res.createButtonResource('about', 'About')
					),
					res.createGroupResource('buttonGroupRight', {
					    'orientation': 'row',
					    'alignChildren': '[\'right\',\'center\']'
					},
						res.createButtonResource('start', 'Start'),
						res.createButtonResource('cancel', 'Cancel')
					)
				)
			);

		_mainWindow = new Window(resource);
		_mainWindow.sourcePanel.doc.addEventListener('click', function (evt) {
			model.setSourceType(app.RLM2.ResizeModel.SourceTypeActiveDocument);
		});
		_mainWindow.sourcePanel.folder.addEventListener('click', function (evt) {
			model.setSourceType(app.RLM2.ResizeModel.SourceTypeFolder);
		});
		_mainWindow.sourcePanel.folderGroup.selectFolder.addEventListener('click', function (evt) {
		    var folder = model.getSourceFolder();
		    folder = folder !== null ? folder : new Folder();
			var selection = folder.selectDlg('Select a folder with images to be resized.');
			if (selection === null) {
				return;
			}
			model.setSourceFolder(selection);
		});
		_mainWindow.destinationPanel.overwriteExistingFile.addEventListener('click', function (evt) {
		    model.setDestinationType(app.RLM2.ResizeModel.DestinationExistingFile);
		});
		_mainWindow.destinationPanel.saveNewFile.addEventListener('click', function (evt) {
		    model.setDestinationType(app.RLM2.ResizeModel.DestinationNewFile);
		});
		_mainWindow.destinationPanel.folderGroup.selectFolder.addEventListener('click', function (evt) {
		    var folder = model.getDestinationFolder();
		    folder = folder !== null ? folder : new Folder();
		    var selection = folder.selectDlg('Select a folder with images to be resized.');
		    if (selection === null) {
		        return;
		    }
		    model.setDestinationFolder(selection);
		});
	    /*		_mainWindow.cropPanel.fit.addEventListener('click', function (evt) {
			model.setCropType(app.RLM2.ResizeModel.CropFit);
		});
		_mainWindow.cropPanel.fill.addEventListener('click', function (evt) {
			model.setCropType(app.RLM2.ResizeModel.CropFill);
		});*/
		_mainWindow.resizePanel.proportionalGroup.maxDimensionLength.addEventListener('keydown', function (evt) {
			if ((isNumberKey (evt.keyName) && !isKeyboardEventModifier (evt)) || isCursorMovement (evt)) {
				return;
			}
			evt.preventDefault();
		});
		_mainWindow.resizePanel.proportionalGroup.maxDimensionLength.addEventListener('change', function (evt) {
			model.setMaxDimensionLength (evt.target.text);
		});
		_mainWindow.buttonGroup.buttonGroupLeft.about.addEventListener('click', function (evt) {
		    model.setLastDialog(new app.RLM2.Dialog(['about']).setReplacements([model.getApplicationName(), model.getApplicationVersion()]));
		});
		_mainWindow.buttonGroup.buttonGroupRight.start.addEventListener('click', function (evt) {
		    model.resize ();
		});

		return _mainWindow;
	}

	if (typeof app.RLM2 === 'undefined') {
		app.RLM2 = function () {};
	}

	app.RLM2.ResizeView = function () {
		this._model;
		this._propertyChangedCallback = function (model, propertyName) {
			var window = getMainWindow(model);
			switch (propertyName) {
			    case 'SourceType':
			        window.sourcePanel.folderGroup.selectFolder.enabled = model.getSourceType() === app.RLM2.ResizeModel.SourceTypeFolder;
			        window.sourcePanel.folderGroup.sourceFolder.enabled = model.getSourceType() === app.RLM2.ResizeModel.SourceTypeFolder;
				    break;
			    case 'SourceFolder':
			        window.sourcePanel.folderGroup.sourceFolder.text = model.getSourceFolderFileSystemName();
				    break;
			    case 'DestinationType':
			        window.destinationPanel.folderGroup.selectFolder.enabled = model.getDestinationType() === app.RLM2.ResizeModel.DestinationNewFile;
			        window.destinationPanel.folderGroup.destinationFolder.enabled = model.getDestinationType() === app.RLM2.ResizeModel.DestinationNewFile;
			        break;
			    case 'DestinationFolder':
			        window.destinationPanel.folderGroup.destinationFolder.text = model.getDestinationFolderFileSystemName();
			        break;
			    case 'LastMessage':
			        raiseLastMessageDialog(model.getLastDialog());
			        break;
			}
		};
	};

	app.RLM2.ResizeView.prototype.setModel = function (model) {
	    this._model = model;
	    this._model.addPropertyChangedCallback(this._propertyChangedCallback);
	};

	app.RLM2.ResizeView.prototype.show = function () {
	    var window = getMainWindow(this._model);
	    return window.show();
	};

})();
