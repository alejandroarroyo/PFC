'use strict';

function createMessageTemplate(message) {
    var messageContent = "<div class='alert alert-error accesibilityError'>" + message +"</div>";
    return messageContent;
}

function drawGeneralMessage(message) {
    var messageContent = createMessageTemplate(message),
        container = "<div style='z-index:99999999'>" + messageContent +"</div>";
    return container;
}

function drawAlertMessage (element, messageTemplate) {
    var containerTemplate = "<div style='position: relative'></div>";
    element.wrap(containerTemplate)
    element.after(messageTemplate);
}

// ################################################################# //
// ######################## DIRECTIVES FOR: ######################## //
// ######################## HTML ELEMENTS   ######################## //
// ################################################################# //
angular.module('projectApp').directive('html', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var alertMessage, alertContent;
            //body
            if (!element.find('body').length) {
                alertMessage = "body: No hay &lt;body&gt;.";
                alertContent = drawGeneralMessage(alertMessage);
                element.append('<body></body>')
                element.append('body').append(alertContent);
            }
            //title
            if (element.find('title')[0]) {
                var pageTitle = element.find('title')[0].outerHTML;
                if (pageTitle === '<title></title>') {
                    alertMessage = "title: La etiqueta &lt;title&gt; está vacía.";
                    alertContent = drawGeneralMessage(alertMessage);
                    element.find('body').append(alertContent);
                }
            } else {
                alertMessage = "title:La etiqueta &lt;title&gt; no existe."
                alertContent = drawGeneralMessage(alertMessage);
                element.find('body').append(alertContent);
            }
            //lang
            if (!attrs.lang) {
                alertMessage = "lang: La etiqueta &lt;lang&gt; no existe o está vacía."
                alertContent = drawGeneralMessage(alertMessage);
                element.find('body').append(alertContent);
            }
        }
    }
});

// ################################################################# //
// ######################## DIRECTIVES FOR: ######################## //
// ######################## IMAGE           ######################## //
// ################################################################# //
angular.module('projectApp').directive('img', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var imgAlt = attrs.alt,
                alertMessage,
                alertMessageTemplate;
            if (!imgAlt) {
                alertMessage = "img: La imagen carece del atributo 'alt' o está vacío.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

// ################################################################# //
// ######################## DIRECTIVES FOR: ######################## //
// ######################## LIST ELEMENTS   ######################## //
// ################################################################# //
angular.module('projectApp').directive('ul', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            if (!element.find('li').length) {
                var alertMessage =  "ul: Esta lista carece de hijos &lt;li&gt;.",
                    alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

angular.module('projectApp').directive('ol', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            if (!element.find('li').length) {
                var alertMessage =  "ol: Esta lista ordenada carece de hijos &lt;li&gt;.",
                    alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

angular.module('projectApp').directive('li', function(){
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var elementParentUl = element.parent()[0].outerHTML.indexOf('<ul'),
                elementParentOl = element.parent()[0].outerHTML.indexOf('<ol'),
                alertMessage, 
                alertMessageTemplate;
            if (elementParentUl < 0 && elementParentOl < 0) {
                alertMessage =  "li: Elemento de lista no tiene como padre &lt;ul&gt; o &lt;ol&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else if (!element.contents().length) {
                alertMessage =  "li: Elemento de lista vacío.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

angular.module('projectApp').directive('dl', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var elementFirstChild = element.children()[0],
                alertMessage, 
                alertMessageTemplate;
            if (!element.find('dt').length) {
                alertMessage =  "dl: Esta lista de definición carece de términos &lt;dt&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
            if (!element.find('dd').length) {
                alertMessage =  "dl: Esta lista de definición carece de deficiones &lt;dd&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
            if(elementFirstChild) {
                if(elementFirstChild.outerHTML.indexOf('<dd') > -1) {
                    alertMessage =  "dl: El primer elemento no puede ser una definición &lt;dd&gt;.";
                    alertMessageTemplate = createMessageTemplate(alertMessage);
                    drawAlertMessage(element, alertMessageTemplate);
                }
            }
        }
    }
});

angular.module('projectApp').directive('dt', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var elementParent = element.parent()[0].outerHTML.indexOf('<dl'),
                elementFirstBrother = element.next()[0],
                alertMessage, 
                alertMessageTemplate;
            if (elementParent < 0) {
                alertMessage =  "dt: Término de lista de definición lt;dt&gt; carece de contenedor &lt;dl&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else if (!element.contents().length) {
                alertMessage =  "dt: Término a definir vacío.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else if (!elementFirstBrother || elementFirstBrother.outerHTML.indexOf('<dd') < 0) {
                alertMessage =  "dt: Término de lista carece de definición &lt;dd&gt; inmediata.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

angular.module('projectApp').directive('dd', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var elementParent = element.parent()[0].outerHTML.indexOf('<dl'),
                alertMessage, 
                alertMessageTemplate;
            if (elementParent < 0) {
                alertMessage =  "dd: Definición de término &lt;dd&gt; carece de contenedor &lt;dl&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else if (!element.contents().length) {
                alertMessage =  "dd: Definción de término vacía.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

// ################################################################# //
// ######################## DIRECTIVES FOR: ######################## //
// ######################## TABLE ELEMENTS  ######################## //
// ################################################################# //
angular.module('projectApp').directive('table', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var headers = 0,
                tableThrows = 0,
                elementsThrow = 0,
                alertMessage,
                alertMessageTemplate;
            if (!element.find('thead').length) {
                alertMessage =  "table: Esta tabla carece de &lt;thead&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else {
                headers = element.find('thead').find('tr').find('th').length;
            }
            if (!element.find('tbody').length) {
                alertMessage =  "table: Esta tabla carece de &lt;tbody&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else {
                elementsThrow = element.find('tbody').find('tr').find('td').length;
                tableThrows = element.find('tbody').find('tr').length;
                if (headers !== (elementsThrow/tableThrows)) {
                    alertMessage =  "table: Número de encabezados diferente a elementos de alguna fila.";
                    alertMessageTemplate = createMessageTemplate(alertMessage);
                    drawAlertMessage(element, alertMessageTemplate);
                }
            }
        }
    }
});

angular.module('projectApp').directive('thead', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var alertMessage, alertMessageTemplate;
            if (!element.find('tr').length) {
                alertMessage =  "thead: Esta tabla carece de fila en &lt;thead&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else if(!element.find('tr').find('th').length) {
                alertMessage =  "thead: Esta tabla carece de celdas en su encabezado &lt;thead&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

angular.module('projectApp').directive('th', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var elementParent = element.parent()[0].outerHTML.indexOf('<tr>' && '</tr>'),
                alertMessage, 
                alertMessageTemplate;
            if (elementParent < 0) {
                alertMessage =  "th: Esta celda carece de una fila contenedora &lt;tr&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
            if (!element.contents().length) {
                alertMessage =  "th: Celda vacía en el encabezado &lt;thead&gt; de la tabla.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

angular.module('projectApp').directive('td', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var alertMessage, alertMessageTemplate;
            if (!element.contents().length) {
                alertMessage =  "td: Celda vacía en una fila &lt;tr&gt; de la tabla.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

angular.module('projectApp').directive('tbody', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var alertMessage, alertMessageTemplate;
            if (!element.find('tr').length) {
                alertMessage =  "tr: No hay filas &lt;tr&gt; en el cuerpo &lt;tbody&gt; de la tabla.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

angular.module('projectApp').directive('tfoot', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var alertMessage, alertMessageTemplate;
            if (!element.find('tr').length) {
                alertMessage =  "tr: No hay filas &lt;tr&gt; en pie &lt;tfoot&gt; de la tabla.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

function findElementToAnalize (elementReferencedByLabel) {
    var elementToAnalize = {
        "name": elementReferencedByLabel,
        "tagHtml": '<' + elementReferencedByLabel
    };

    return elementToAnalize;
}

function analyzeLabelWithFor (element , attrs, elementReferencedByLabel) {
    var elementToAnalize = findElementToAnalize (elementReferencedByLabel),
        errorAnazingElement = {
            'error': false,
            'conditionalError': false,
            'message': "" 
        };

    //console.log(attrs['for']);
    if (element.next()){
        //console.log(element.next()[0].outerHTML.indexOf(elementToAnalize.tagHtml) > -1)
        if(element.next()[0].outerHTML.indexOf(elementToAnalize.tagHtml) > -1) {
            //console.log('Hay ' + elementToAnalize.name + ' al cerca del label');
            if (element.next().find('input')[0]) {
                if (element.next().find('input')[0].outerHTML.indexOf(elementToAnalize.tagHtml) > -1) {
                    if (element.next().find('input').attr('id') === attrs['for']) {
                        //console.log('Hay ' + elementToAnalize.name + ' contenido por otro elemento');
                        //console.log('for del label SÍ coincide con el id ' + elementToAnalize.name);
                    } else {
                        errorAnazingElement.error = true;
                        errorAnazingElement.message = 'Label: Atributo for de &lt;label&gt; no coincide con id de &lt;' + elementToAnalize.name + '&gt;';
                        //console.log(element.next().find('input')[0]);
                        //console.log('Error: for del label NO coincide con el id ' + elementToAnalize.name);
                    }
                }
            } else {
                if (element.next().attr('id') === attrs['for']) {
                    //console.log('Hay ' + elementToAnalize.name + ' al mismo nivel que el label');
                    //console.log('for del label SÍ coincide con el id ' + elementToAnalize.name);
                } else {
                    errorAnazingElement.error = true;
                    errorAnazingElement.message = 'Label: Atributo for de &lt;label&gt; no coincide con id de &lt;' + elementToAnalize.name + '&gt;';
                    //console.log(element.next()[0]);
                    //console.log('Error: for del label NO coincide con el id ' + elementToAnalize.name);
                }
            }
            //console.log(element.next().find('input'));

        }
    } else {
        //console.log('no hay next se busca dentro del label');
        if (element.find(elementToAnalize.name).length) {
            //console.log(element.find(elementToAnalize.name));
            if (element.find(elementToAnalize.name).attr('id') === attrs['for']) {
                //console.log('for del label coincide con el id ' + elementToAnalize.name);
            } else {
                errorAnazingElement.error = true;
                errorAnazingElement.message = 'Label: Atributo for de &lt;label&gt; no coincide con id de &lt;' + elementToAnalize.name + '&gt;';
                //console.log('Error: for del label NO coincide con el id' + elementToAnalize.name);
            }
        } else {
            errorAnazingElement.conditionalError = true;
            errorAnazingElement.message = 'Label: No hay elemento de formulario al que referenciar con el &lt;label&gt;.';
            //console.log('Error: No hay ' + elementToAnalize.name + ' al lado del label ni dentro');
        }
    }
    if (!element.text().length && !errorAnazingElement.error) {
        //console.log("No hay texto en label");
        if(element.find('span').length) {
            if (!element.find('span').text()) {
                errorAnazingElement.error = true;
                errorAnazingElement.message = 'Label: Si  &lt;label&gt; no contiene texto debe existir dentro un &lt;span&gt; con texto.';
                //console.log('Error: span dentro del label vacío')
            }
        } else {
            errorAnazingElement.error = true;
            errorAnazingElement.message = 'Label: Si &lt;label&gt; no contiene texto debe existir dentro un &lt;span&gt; con texto.';
            //console.log('Error: Label sin texto y no hay span');
        }
    }

    return errorAnazingElement;
}

// ################################################################# //
// ######################## DIRECTIVES FOR: ######################## //
// ######################## FORM ELEMENTS   ######################## //
// ################################################################# //

function analyzeLabelWithoutFor (element , attrs, elementReferencedByLabel) {
    var elementToAnalize = findElementToAnalize (elementReferencedByLabel),
        errorAnazingElement = {
            'error': false,
            'message': "" 
        };

    //console.log('Label sin for');
    if (element.find(elementToAnalize.name).length !== 1) {
        errorAnazingElement.conditionalError = true;
        errorAnazingElement.message = 'Label: Más de un &lt;' + elementToAnalize.name + '&gt o ninguno contenido en el &lt;label&gt;.';
        //console.log('Error: Más de un ' + elementToAnalize.name + ' dentro del label o ninguno');
    } else {
        //console.log('Hay ' + elementToAnalize.name + ' dentro del label');
    }
   if (!element.text().length && !errorAnazingElement.error) {
        //console.log("No hay texto en label");
        if(element.find('span').length) {
            if (!element.find('span').text()) {
                errorAnazingElement.error = true;
                errorAnazingElement.message = 'Label: Si &lt;label&gt; no contiene texto debe existir dentro un &lt;span&gt; con texto.';
                //console.log('Error: span dentro del label vacío')
            }
        } else {
            errorAnazingElement.error = true;
            errorAnazingElement.message = 'Label: Si &lt;label&gt; no contiene texto debe existir dentro un &lt;span&gt; con texto.';
            //console.log('Error: Label sin texto y no hay span');
        }
    }

    return errorAnazingElement;
}

angular.module('projectApp').directive('label', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var alertMessage, 
                alertMessageTemplate,
                errorAnazingLabelInput = false,
                errorAnazingLabelTextarea = false,
                errorAnazingLabelSelect = false,
                errorConditional = false, // No hay ni input, textarea ni select al que referencie el label
                errorLabelInLabel = false;
            
            if (element.find('label').length) {
                errorLabelInLabel = true;
                console.log('Error: Hay label dentro de label');
            } else if (attrs['for']) {
                errorAnazingLabelInput = analyzeLabelWithFor(element, attrs, 'input');
                errorAnazingLabelTextarea = analyzeLabelWithFor(element, attrs, 'textarea');
                errorAnazingLabelSelect = analyzeLabelWithFor(element, attrs, 'select');
                errorConditional = errorAnazingLabelInput.conditionalError && errorAnazingLabelTextarea.conditionalError && errorAnazingLabelSelect.conditionalError
            } else if (!errorAnazingLabelInput){
                errorAnazingLabelInput = analyzeLabelWithoutFor(element, attrs, 'input');
                errorAnazingLabelTextarea = analyzeLabelWithoutFor(element, attrs, 'textarea');
                errorAnazingLabelSelect = analyzeLabelWithoutFor(element, attrs, 'select');
                errorConditional = errorAnazingLabelInput.conditionalError && errorAnazingLabelTextarea.conditionalError && errorAnazingLabelSelect.conditionalError
            }

            if (errorLabelInLabel) {
                alertMessage = 'Label: Un &lt;label&gt; no debe contener otro &lt;label&gt;.';
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else if (errorConditional) {
                alertMessage = errorAnazingLabelInput.message;
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }else if (errorAnazingLabelInput.error) {
                alertMessage = errorAnazingLabelInput.message;
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else if (errorAnazingLabelTextarea.error) {
                alertMessage = errorAnazingLabelTextarea.message;
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else if (errorAnazingLabelSelect.error) {
                alertMessage = errorAnazingLabelSelect.message;
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }

        }
    }
});

angular.module('projectApp').directive('input', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var alertMessage, alertMessageTemplate;
            if (!attrs.name) {
                alertMessage =  "Input: Este &lt;input&gt; carece de atributo 'name'.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

angular.module('projectApp').directive('textarea', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var alertMessage, alertMessageTemplate;
            if (!attrs.name) {
                alertMessage =  "Textarea: Este &lt;textarea&gt; carece de atributo 'name'.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

angular.module('projectApp').directive('select', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var alertMessage, alertMessageTemplate;
            if (!attrs.name) {
                alertMessage =  "Select: Este &lt;select&gt; carece de atributo 'name'.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else if (!element.find('option').length) {
                alertMessage =  "Select: Este &lt;select&gt; no contiene opciones &lt;option&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});


angular.module('projectApp').directive('form', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var alertMessage, alertMessageTemplate;
            if (!element.find('input').length && !element.find('select').length && !element.find('textarea').length) {
                alertMessage =  "Form: No hay elementos de formulario dentro de este &lt;form&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else if (element.find('form').length) {
                alertMessage =  "Form: Este formulario contiene otra etiqueta &lt;form&gt;.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            } else if (!attrs.name) {
                alertMessage =  "Form: Este formulario carece de atributo 'name'.";
                alertMessageTemplate = createMessageTemplate(alertMessage);
                drawAlertMessage(element, alertMessageTemplate);
            }

        }
    }
});

angular.module('projectApp').directive('legend', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var alertMessage, alertMessageTemplate;

            if (element.parent()[0]) {
                if (element.parent()[0].outerHTML.indexOf('<fieldset') < 0) {
                    alertMessage =  "Legend: Este &lt;legend&gt; no es hijo inmediato de un &lt;fieldset&gt;.";
                    alertMessageTemplate = createMessageTemplate(alertMessage);
                    drawAlertMessage(element, alertMessageTemplate);
                } else if (!element.text().length) {
                    alertMessage =  "Legend: Este &lt;legend&gt; carece de texto.";
                    alertMessageTemplate = createMessageTemplate(alertMessage);
                    drawAlertMessage(element, alertMessageTemplate);
                }
            } else {
                    alertMessage =  "Legend: Este &lt;legend&gt; no es hijo de un &lt;fieldset&gt;.";
                    alertMessageTemplate = createMessageTemplate(alertMessage);
                    drawAlertMessage(element, alertMessageTemplate);
            }
        }
    }
});

function findParent (element) {
    var elementParent = element.parent();
    return elementParent;
}

// angular.module('projectApp').directive('fieldset', function() {
//     return {
//         restrict: 'E',
//         link: function(scope, element, attrs) {
//             var alertMessage, 
//                 alertMessageTemplate,
//                 elementParent = element,
//                 firstTagCharacters,
//                 parentFormFound = false,
//                 parentNotFound = false;

//             while (!parentFormFound && !parentNotFound) {
//                 //console.log(elementParent[0]);
//                 elementParent = findParent(elementParent);
//                 if (elementParent[0].outerHTML) {
//                     firstTagCharacters = elementParent[0].outerHTML.substring(0, 5);
//                     //console.log(firstTagCharacters);
//                     if (firstTagCharacters.indexOf('<form') > -1) {
//                         //console.log(elementParent[0]);
//                         //console.log('encontrado');
//                         parentFormFound = true;
//                     } else {
//                         //console.log('seguir buscando');
//                     }
//                 } else {
//                     parentNotFound = true;
//                 }
//             }

//             if (parentNotFound) {
//                 alertMessage =  "Fieldset: Este &lt;fieldset&gt; no es hijo de un &lt;form&gt;.";
//                 alertMessageTemplate = createMessageTemplate(alertMessage);
//                 drawAlertMessage(element, alertMessageTemplate);
//             } else if (element.children()[0].outerHTML) {
//                 firstTagCharacters = element.children()[0].outerHTML.substring(0, 7);
//                 if (firstTagCharacters.indexOf('<legend') < 0) {
//                     alertMessage =  "Fieldset: Este &lt;fieldset&gt; carece de &lt;legend&gt; como hijo inmediato o está vacío.";
//                     alertMessageTemplate = createMessageTemplate(alertMessage);
//                     drawAlertMessage(element, alertMessageTemplate);
//                 }
//             }

//         }
//     }
// });