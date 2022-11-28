const f = require("fs");
function test() {
    f.writeFile(
        "test.txt",
        "字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字",
        (_error) => {}
    );
}
