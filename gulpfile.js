const gulp = require('gulp');
const bump = require('gulp-bump');
const git = require('gulp-git');
const tag_version = require('gulp-tag-version');
const PluginError = require('plugin-error');
const minimist = require('minimist');


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
  return gulp.src(["./package.json"]).pipe(tag_version());
}

function createGitCommit() {
  return gulp
    .src(["./package.json", "./package-lock.json"])
    .pipe(git.commit("bump version"));
}

function updateVersion(done) {
  var options = minimist(process.argv.slice(2), releaseOptions);

  return gulp
    .src(["./package.json", "./package-lock.json"])
    .pipe(bump({ type: options.semver }))
    .pipe(gulp.dest("./"))
    .on("end", () => {
      done();
    });
}


gulp.task('release', gulp.series( updateVersion, createGitCommit, createGitTag));
gulp.task('default', gulp.series('release'));
