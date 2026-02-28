const gulp = require('gulp');
const bump = require('gulp-bump');
const git = require('gulp-git');
const tag_version = require('gulp-tag-version');
const argv = require('yargs').argv;
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


gulp.task('release', gulp.series(updateVersion, createGitCommit, createGitTag));
gulp.task('update', gulp.series(updateVersion, createGitTag));
gulp.task('updateVersion', gulp.series(updateVersion));
gulp.task('updateTag', gulp.series(createGitTag));

gulp.task('default', gulp.series('release'));
