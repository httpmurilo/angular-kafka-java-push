"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_line_class_1 = require("./src/command-line-parser/command-line.class");
var command_line_config_1 = require("./src/command-line-parser/command-line.config");
var cli_executor_class_1 = require("./src/cli-executor/cli-executor.class");
command_line_class_1.CommandLine.parse(command_line_config_1.OPTIONS_DEFINITIONS)
    .then(function (argv) {
    if (argv.help) {
        command_line_class_1.CommandLine.help();
    }
    else {
        cli_executor_class_1.NgxsCliExecutor.run(argv);
    }
})
    .catch(function (e) {
    console.error(e.message);
    command_line_class_1.CommandLine.help();
});
//# sourceMappingURL=index.js.map