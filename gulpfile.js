const gulp = require('gulp');
const bump = require('gulp-bump');
const git = require('gulp-git');
const tag_version = require('gulp-tag-version');
const PluginError = require('plugin-error');
const minimist = require('minimist');
var argv = require('yargs').argv;
var isProduction = (argv.production === undefined) ? false : true;

const releaseOptions = {
    semver: "",
};

function validateArgs(done) {
  const options = minimist(process.argv.slice(2), releaseOptions);
  if (!options.semver) {
    return done(
      new PluginError("updateVersion", {
        message:
          "Missing `--semver` option. Possible values: patch, minor, major",
      })
    );
  }
  if (!["patch", "minor", "major"].includes(options.semver)) {
    return done(
      new PluginError("updateVersion", {
        message:
          "Invalid `--semver` option. Possible values: patch, minor, major",
      })
    );
  }

  done();
}
function createGitTag() {
  return gulp.src(["./package.json"]).pipe(tag_version({version: argv.ver , label: argv.ver}));
}

function createGitCommit() {
  return gulp
    .src(["./package.json", "./package-lock.json"])
    .pipe(git.commit("bump version"));
}

function updateVersion(done) {
  // var options = minimist(process.argv.slice(2), releaseOptions);

  return gulp
    .src(["./package.json", "./package-lock.json"])
    .pipe(bump({ version: argv.ver}))
    .pipe(gulp.dest("./"))
    .on("end", () => {
      done();
    });
}


gulp.task('release', gulp.series( updateVersion, createGitCommit, createGitTag));
gulp.task('update', gulp.series( updateVersion, createGitTag));
gulp.task('updateVersion', gulp.series( updateVersion));
gulp.task('updateTag', gulp.series( createGitTag));
gulp.task('validArgs', gulp.series( validateArgs));

gulp.task('default', gulp.series('release'));
