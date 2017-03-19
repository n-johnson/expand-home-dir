var test = require('ava');
var expand = require("./");
var path = require("path");
var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

if (!home) throw new Error('Failed');

test('expands ~/', t => {
  let expected = path.join(home, '/foo/bar/qux.corge');
  t.is(expand('~/foo/bar/qux.corge'), expected);
  t.is(expand('/foo/bar/qux.corge'), '/foo/bar/qux.corge');
  t.is(expand('~'), home);
});

if (/^win/.test(process.platform)) {
  test('expands ~\\ (windows}', t => {
    var expected = path.join(home, '\\foo\\bar\\qux.corge');
    t.is(expand('~\\foo/bar/qux.corge'), expected);
  });
}
