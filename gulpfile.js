
const gulp = require('gulp');
const fs = require('fs');
const del = require('del');
const $ = require('gulp-load-plugins')();

// Utility to ignore unnecessary files
// when generating the glob patterns array for gulp.src()
function addDefSrcIgnore (srcArr) {
  return srcArr.concat([
    '!**/node_modules{,/**}',
    '!node_modules{,/**}',
    '!private{,/**}',
    '!dist{,/**}',
    '!.git{,/**}',
    '!**/.DS_Store'
  ]);
}

// JavaScript and JSON linter
function lintJs () {
  return gulp.src(addDefSrcIgnore(['**/*.js', '**/*.json']), {dot: true})
    .pipe($.eslint({dotfiles: true}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
}

// HTML linter
function lintHtml () {
  return gulp.src(addDefSrcIgnore(['**/*.html']))
    .pipe($.htmllint({config: '.htmllintrc.json', failOnError: true}));
}

// CSS linter
function lintCss () {
  return gulp.src(addDefSrcIgnore(['**/*.css']))
    .pipe($.stylelint({
      failAfterError: true,
      reporters: [{formatter: 'string', console: true}]
    }));
}

// Remove solutions from exercises
function removeSolutions () {
  del.sync('dist');
  return gulp.src(addDefSrcIgnore(['**', '!**/REMOVE{,/**}']), {dot: true})
    .pipe($.replace(/^\s*(\/\/|<!--|\/\*)\s*REMOVE-START[\s\S]*?REMOVE-END\s*(\*\/|-->)?\s*$/gm, ''))
    .pipe(gulp.dest('dist'));
}

// Prepare for distribution to students
function updateConfigForSlave (cb) {

  function removeMaster (str) {
    var strArr = str.split('-');
    strArr[strArr.length - 1] === 'master' && strArr.pop();
    return strArr.join('-');
  }

  const npmConfig = require('./package.json');
  npmConfig.name = removeMaster(npmConfig.name);
  npmConfig.repository.url = removeMaster(npmConfig.repository.url);
  npmConfig.scripts['precommit'] = 'gulp lint';
  fs.writeFileSync('dist/package.json', JSON.stringify(npmConfig, null, 2));
  const esLintConfig = require('./.eslintrc.json');
  esLintConfig.rules['no-undef'] = 'off';
  esLintConfig.rules['no-unused-vars'] = 'off';
  fs.writeFileSync('dist/.eslintrc.json', JSON.stringify(esLintConfig, null, 2));

  cb();

}

// Lint all files
exports.lint = gulp.parallel(
  lintJs,
  lintHtml,
  lintCss
);

// Prepare for distribution to students
exports.dist = gulp.series(
  removeSolutions,
  updateConfigForSlave
);
