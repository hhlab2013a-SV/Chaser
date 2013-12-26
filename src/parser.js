insertFunctions = [];

function assign(symbol, value, node) {
    if(value) {
        switch(value.TYPE) {
            case "String":
                insertFunctions.push({ value: ";queue.push({ type: 'Assign', symbol: '" + symbol+ "', value_type: '" + value.TYPE  + "', value: '" + value.value + "' });", pos: node.end.endpos });
                break;

            case "Number":
                insertFunctions.push({ value: ";queue.push({ type: 'Assign', symbol: '" + symbol + "', value_type: '" + value.TYPE  + "', value: " + value.value + " });", pos: node.end.endpos });
                break;

            case "Binary":
                var stream = UglifyJS.OutputStream({ beautify: true });
                value.print(stream);
                insertFunctions.push({ value: ";queue.push({ type: 'Assign', symbol: '" + symbol + "', value_type: '" + value.TYPE  + "', value: '" + stream.toString()  + "' });", pos: node.end.endpos });
                break;

            case "SymbolRef":
                insertFunctions.push({ value: ";queue.push({ type: 'Assign', symbol: '" + symbol + "', value_type: '" + value.TYPE  + "', value: '" + name + "' });", pos: node.end.endpos });
                break;

            case "Function":
                insertFunctions.push({ value: ";queue.push({ type: 'Assign', symbol: '" + symbol + "', value_type: '" + value.TYPE + "'});", pos: node.end.endpos });
                break;

                // objectはpropertiesを持つので、それをうまく活用する
                // prototyoeをどうやって表現するか
                // object生成用のTypeを作成するひつようがあるか
            case "Object":
                insertFunctions.push({ value: ";queue.push({ type: 'Assign', symbol: '" + symbol + "', value_type: '" + value.TYPE + "'});", pos: node.end.endpos });
                break;
        }
    }
}

function parseNode(node) {
    switch(node.TYPE) {
        case "Var":
            if(node.hasOwnProperty("definitions")) {
                for(var i = 0; i < node.definitions.length; i++) {
                    var varDef = node.definitions[i];
                    var name = varDef.name.name;
                    insertFunctions.push({ value: ";queue.push({ type: 'Var', symbol: '" + name +"' });", pos: node.end.endpos });
                    assign(name, varDef.value, varDef);
                }
            }
            break;

        case "Assign":
            assign(node.left.name, node.right, node);
            break;

        case "ForIn":
            if(node.hasOwnProperty("step")) {
                var startLine = node.start.line - 1;
                var endLine   = node.step.end.line - 1;
            }
            break;

        case "For":
            insertFunctions.push({ value: "queue.push({ type: 'For' });", pos: node.start.pos });
            if (node.hasOwnProperty("init")) {
                var init = node.init;
            }

            var hasCondition = false;
            if (node.hasOwnProperty("condition")) {
                var condition = node.condition;
            }


            if (node.hasOwnProperty("body")) {
                var body = node.body;
                var addKakko = false;
                if(node.body.TYPE == "BlockStatement") {
                } else {
                    addKakko = true;
                    insertFunctions.push({ value: "{", pos: body.start.pos });
                }

                insertFunctions.push({ value: "queue.push({ type: 'ForLoopStart' });", pos: body.start.endpos });
                parseNode(body);
                insertFunctions.push({ value: "queue.push({ type: 'ForLoopEnd' });", pos: body.end.pos });

                if(addKakko) {
                    insertFunctions.push({ value: "}", pos: body.end.endpos });
                }
            }
            insertFunctions.push({ value: "queue.push({ type: 'EndFor' });", pos: node.end.endpos });
            break;

        case "If":
            insertFunctions.push({ value: "queue.push({ type: 'If'});", pos: node.start.pos });
            if(node.hasOwnProperty("condition")) {
                var stream = UglifyJS.OutputStream({ beautify: true });
                node.condition.print(stream);
                insertFunctions.push({ value: "queue.push({ type: 'Condition', value: '" + stream.toString() + "' }) && ", pos: node.condition.start.pos });
            }

            if(node.hasOwnProperty("body")) {
                insertFunctions.push({ value: "queue.push({ type: 'ConditionResult', value: 'TRUE' }); ", pos: node.body.start.endpos });
                var body = node.body.body;
                if(body instanceof Array) {
                    for(var i = 0; i < body.length; i++) {
                        parseNode(body[i]);
                    }
                } else {
                    parseNode(body);
                }
            }

            if(node.hasOwnProperty("alternative")) {
                insertFunctions.push({ value: "queue.push({ type: 'ConditionResult', value: 'FALSE' }); ", pos: node.alternative.start.endpos });
                var body = node.alternative.body;
                if(body instanceof Array) {
                    for(var i = 0; i < body.length; i++) {
                        parseNode(body[i]);
                    }
                } else {
                    parseNode(body);
                }
            }
            insertFunctions.push({ value: "queue.push({ type: 'EndIf' });", pos: node.end.endpos });
            break;

        default:
            if(node.hasOwnProperty("body")) {
                if(node.body instanceof Array) {
                    for(var i = 0, il = node.body.length; i < il; i++) {
                        parseNode(node.body[i]);
                    }
                } else {
                    parseNode(node.body);
                }
            }

    }

}
