"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const change_case_1 = require("change-case");
function changeCase(attributes, caseType) {
    const caseTypes = {
        camelCase: change_case_1.camelCase,
        snakeCase: change_case_1.snakeCase,
        paramCase: change_case_1.paramCase,
        kebabCase: change_case_1.paramCase
    };
    const caseFn = caseTypes[caseType];
    if (!caseFn) {
        throw new Error('Invalid case type: ' + caseType);
    }
    const newAttributes = {};
    for (const key of Object.keys(attributes)) {
        newAttributes[caseFn(key)] = attributes[key];
    }
    return newAttributes;
}
exports.changeCase = changeCase;
function whitelist(obj, list) {
    const result = {};
    for (const key of list) {
        result[key] = obj[key];
    }
    return result;
}
exports.whitelist = whitelist;
