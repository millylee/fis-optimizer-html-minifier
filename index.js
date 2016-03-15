'use strict';
var minify = require('html-minifier').minify;
var UglifyJS = require('uglify-js');
var CleanCss = require('clean-css');

var styleReg = /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig;
var scriptReg = /(<script(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/script\s*>|$)/ig;

module.exports = function(content, file, conf) {
    //compress html
    content = minify(content, conf);
    conf.fromString = true;
    conf.processImport = false;
    //compress inline style
    content = content.replace(styleReg, function(m, start_tag, cont, end_tag) {
        var parseCont = "";
        try {
            parseCont = CleanCss.process(cont, conf);
        } catch (e) {
            parseCont = cont;
        }
        return start_tag + parseCont + end_tag;
    });
    //compress inline script
    content = content.replace(scriptReg, function(m, start_tag, cont, end_tag) {
        var parseCont = "";
        try {
            parseCont = UglifyJS.minify(cont, conf).code;
        } catch (e) {
            parseCont = cont;
        }
        return start_tag + parseCont + end_tag;
    });
    file.setContent(content);
    return content;
};

//default options
module.exports.defaultOptions = {
    removeComments:                true,
    removeCommentsFromCDATA:       true,
    removeCDATASectionsFromCDATA:  false,
    collapseWhitespace:            true,
    collapseBooleanAttributes:     true,
    removeAttributeQuotes:         true,
    removeRedundantAttributes:     true,
    useShortDoctype:               true,
    removeEmptyAttributes:         true,
    removeEmptyElements:           false,
    removeOptionalTags:            false,
    removeScriptTypeAttributes:    true,
    removeStyleLinkTypeAttributes: true
};