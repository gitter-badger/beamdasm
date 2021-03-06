// Copyright 2018 Valentin Ivanov (valen.ivanov@gmail.com)

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

import * as vscode from 'vscode';

import BeamDasmContentProvider from './contentProvider';
import BeamDasmHoverProvider from './hoverProvider';

export function activate(context: vscode.ExtensionContext) {

    vscode.languages.registerHoverProvider("beamdasm", new BeamDasmHoverProvider());
    vscode.workspace.registerTextDocumentContentProvider("beamdasm", new BeamDasmContentProvider());
    //vscode.languages.registerHoverProvider("beam", new BeamDasmHoverProvider());
    //vscode.workspace.registerTextDocumentContentProvider("beam", new BeamDasmContentProvider());

    
    context.subscriptions.push(vscode.commands.registerCommand('beamdasm.disassemble', (fileUri) => {
                      
        if( !fileUri || !(fileUri instanceof vscode.Uri)) {
            let editor = vscode.window.activeTextEditor;

            if (!editor) {
                return;
            }
                
            fileUri = editor.document.uri;
        }        

        let beamDasmDocument = vscode.Uri.file(fileUri.fsPath.replace(".beam",".beamdasm"));
        vscode.commands.executeCommand('vscode.open', beamDasmDocument.with( {scheme: 'beamdasm'} ));
    }));
}

export function deactivate() {
}
