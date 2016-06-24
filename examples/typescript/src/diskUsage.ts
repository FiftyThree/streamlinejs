/*
 * Usage: _node diskUsage [path]
 *
 * Recursively computes the size of directories.
 *
 * Demonstrates how standard asynchronous node.js functions
 * like fs.stat, fs.readdir, fs.readFile can be called from 'streamlined'
 * Javascript code.
 */
import { _ } from 'streamline-runtime';
import * as fs from 'fs';

function du(_: _, path: string) {
  var total = 0;
  var stat = fs.stat(path, _);
  if (stat.isFile()) {
    total += fs.readFile(path, _).length;
  } else if (stat.isDirectory()) {
    var files = fs.readdir(path, _);
    for (var i = 0; i < files.length; i++) {
      total += du(_, path + "/" + files[i]);
    }
    console.log(path + ": " + total);
  } else {
    console.log(path + ": odd file");
  }
  return total;
}

var p = process.argv.length > 2 ? process.argv[2] : ".";
var t0 = Date.now();
_.run(_ => du(_, p), err => {
    if (err) throw err;
    console.log("completed in " + (Date.now() - t0) + " ms");
}