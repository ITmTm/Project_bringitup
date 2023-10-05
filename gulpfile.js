"use strict";

const gulp = require("gulp");
const htmlmin = require('gulp-htmlmin');

const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const dist = "./dist/";
gulp.task("copy-html", () => {
    return gulp.src("./src/*.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
                .pipe(gulp.dest(dist + "/assets"))
                .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
        server: {
            baseDir: "./dist/",
            serveStaticOptions: {
                extensions: ["html"]
            }
        },
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/*.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task('minify-html', function() {
    return gulp.src('./src/index.html') // указываем пути к файлам .html
        .pipe(htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        }))
        .pipe(gulp.dest('dist')); // оптимизированные файлы .html переносим на продакшен
});

gulp.task('minify-modules-html', function() {
    return gulp.src('./src/modules.html') // указываем пути к файлам .html
        .pipe(htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        }))
        .pipe(gulp.dest('dist')); // оптимизированные файлы .html переносим на продакшен
});

gulp.task('minify-css', function() {
    return gulp.src('./src/assets/css/main.css') // указываем пути к файлам .html
        .pipe(htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        }))
        .pipe(gulp.dest('dist/assets/css')); // оптимизированные файлы .html переносим на продакшен
});

gulp.task('minify-main-less', function() {
    return gulp.src('./src/assets/less/main.less') // указываем пути к файлам .html
        .pipe(htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        }))
        .pipe(gulp.dest('dist/assets/css')); // оптимизированные файлы .html переносим на продакшен
});

gulp.task('minify-bootstrap-css', function() {
    return gulp.src('./src/assets/css/bootstrap.css') // указываем пути к файлам .html
        .pipe(htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        }))
        .pipe(gulp.dest('dist/assets/css')); // оптимизированные файлы .html переносим на продакшен
});

gulp.task('minify-animate-css', function() {
    return gulp.src('./src/assets/css/animate.min.css') // указываем пути к файлам .html
        .pipe(htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        }))
        .pipe(gulp.dest('dist/assets/css')); // оптимизированные файлы .html переносим на продакшен
});

gulp.task('reset-css', function() {
    return gulp.src('./src/assets/css/reset.css') // указываем пути к файлам .html
        .pipe(htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        }))
        .pipe(gulp.dest('dist/assets/css')); // оптимизированные файлы .html переносим на продакшен
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));


gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));