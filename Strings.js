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

    app.RLM2.Strings = function () { };

    app.RLM2.Strings.Dialog = {};
    app.RLM2.Strings.Dialog.about = { 'title': { 'en': 'About' }, 'message': { 'en': '%1 - v%2' } };
    app.RLM2.Strings.Dialog.selectActiveFolder = { 'title': { 'en': 'Image missing' }, 'message': { 'en': 'Please open an image file to use the \'Image source\' \'Current open file\' option.' } };
    app.RLM2.Strings.Dialog.selectFolder = {'title':{ 'en': 'Folder missing' },'message':{ 'en': 'Please use the \'Image source\' \'Select\' button to choose a folder for input.' }};
    app.RLM2.Strings.Dialog.resizeActiveDocument = {};
    app.RLM2.Strings.Dialog.resizeActiveDocument.success = { 'title': { 'en': 'Success' }, 'message': { 'en': 'Image was resized!' } };
    app.RLM2.Strings.Dialog.resizeActiveDocument.failure = { 'title': { 'en': 'Failed' }, 'message': { 'en': 'Image was not resized.' } };
    app.RLM2.Strings.Dialog.resizeSourceFolder = { 'title': { 'en': 'Files resized' }, 'message': { 'en': 'Successfully resized %1 of %2 files.' } };
    app.RLM2.Strings.Dialog.noDestinationFolderSelected = { 'title': { 'en': 'Destination folder missing' }, 'message': { 'en': 'Please use the \'Save resized image\' \'Select\' button to choose a folder where resized images will be saved.' } };

    app.RLM2.Strings.MainWindow = {};
    app.RLM2.Strings.MainWindow.sourcePanel = { 'en': 'Image source' };
    app.RLM2.Strings.MainWindow.destinationPanel = { 'en': 'Save resized image' };
    app.RLM2.Strings.MainWindow.resizePanel = { 'en': 'Resizing' };
    app.RLM2.Strings.sourcePanel = { 'doc': { 'en': 'Current open file' }, 'folder': { 'en': 'Folder' } };
    app.RLM2.Strings.destinationPanel = { 'overwriteExistingFile': { 'en': 'Replace file' }, 'saveNewFile': { 'en': 'In new file' } };

})();