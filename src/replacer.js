var insertFuntions = [];

function replace(source) {

    var lines = source.split("\n");
    var ast = UglifyJS.parse(source);
    var stream = UglifyJS.OutputStream({});
    ast.print(stream);
    console.log(ast);
    console.log(stream.toString());

    for(var i = 0, il = ast.body.length; i < il; i++) {
        parseNode(ast.body[i]);
    }
    console.log(insertFunctions);

    for(
        var i = 0, current_pos = 0, line_num = 0, line_length = lines[0].length + 1, offset = 0;
        i < insertFunctions.length;
        i++) {
        var insertFunction = insertFunctions[i];
        while(insertFunction.pos > current_pos + line_length) {
            current_pos += line_length;
            offset = 0;

            line_num++;
            line_length = lines[line_num].length + 1;
        }

        var index = insertFunction.pos - current_pos;
        lines[line_num] = lines[line_num].splice(index + offset, 0, insertFunction.value);

        offset += insertFunction.value.length;
    }

    source = lines.join("\n");

    return source;
}
