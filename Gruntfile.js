
'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('src/templates/data/site.yml'),

    assemble: {
      // Task-level options
      options: {
        //prettify: {indent: 4},
        marked: {sanitize: false},
        production: true,
        data: 'src/templates/**/*.{json,yml}',
        assets: '<%= site.destination %>/assets',
        helpers: 'src/templates/helpers/helper-*.js',
        layoutdir: 'src/templates/layouts',
        partials: ['src/templates/includes/**/*.hbs'],
      },
      dev: {
        // Target-level options
        options: {layout: 'default.hbs'},
        files: [
          { expand: true, cwd: 'src/templates/pages', src: ['*.hbs'], dest: '<%= site.dev %>/' }
        ]
      },
      prod:  {
        // Target-level options
        options: {layout: 'prod.hbs'},
        files: [
          { expand: true, cwd: 'src/templates/pages', src: ['*.hbs'], dest: '<%= site.prod %>/' }
        ]
      },
      doc:  {
        // Target-level options
        options: {layout: 'doc.hbs'},
        files: [
          { expand: true, cwd: 'src/templates/doc', src: ['*.hbs'], dest: '<%= site.doc %>/' }
        ]
      }
    },

    // use compass to compile everything in the "sass" directory into "css"
    compass: {
        // the "production" build subtask (grunt compass:dist)
        prod: {
            options: {
                sassDir: '<%= site.assets %>/sass',
                cssDir: '<%= site.prod %>/css',
                environment: 'production',
                outputStyle: 'compressed',
                noLineComments : true
            }
        },
        // the "development" build subtask (grunt compass:dev)
        dev: {
            options: {
                sassDir: '<%= site.assets %>/sass',
                cssDir: '<%= site.dev %>/css',
                outputStyle: 'expanded'
            }
        }
    },

    mkdir: {
      tmp: {
        options: {
          create: ['<%= site.rootwww %>/tmp']
        }
      }
    },

    spritepacker: {
      retina: {
          options: {
            // Path to the template for generating metafile:
            template: '<%= site.assets %>/sprites_tpl/sprites.scss.tpl',

            // Destination metafile:
            destCss: '<%= site.assets %>/sass/_sprites.scss',

            // Base URL for sprite image, used in template
            baseUrl: '../imgs/sprites/',
            padding: 4,
            evenPixels: true
          },
          files: {
              '<%= site.rootwww %>/tmp/sprites.png':
              ['<%= site.assets %>/spritesrc/*.png']
          }
        }
    },

   retinafy: {
      options: {
        sizes: {
          '50%':  { suffix: '@1' },
          '100%':  { suffix: '@2' }
        }
      },
      files: {
        expand: true,
        cwd: '<%= site.rootwww %>/tmp/',
        ext: '.png',
        src: ['*.png','!*@1.png', '!*@2.png'],
        dest: '<%= site.dev %>/imgs/sprites/'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      all: ['<%= site.dev %>/**/*.{html,md}'],
      dev: ['<%= site.rootwww %>/tmp/**/*.*']
    },

    prettify: {
        options: {
        "indent": 4,
        "condense": true,
        "indent_inner_html": true,
        "unformatted": [
          "code"
        ]
      },
      // Prettify a directory of files
      dev: {
        expand: true,
        cwd: '<%= site.dev %>',
        ext: '.html',
        src: ['*.html'],
        dest: '<%= site.dev %>'
      },
      prod: {
        expand: true,
        cwd: '<%= site.prod %>',
        ext: '.html',
        src: ['*.html'],
        dest: '<%= site.prod %>'
      },
      doc: {
        expand: true,
        cwd: '<%= site.doc %>',
        ext: '.html',
        src: ['*.html'],
        dest: '<%= site.doc %>'
      }
    },

    copy: {
      main: {
        expand: true,
        cwd: '<%= site.assets %>/js/',
        src: ['**/*.js','**/*.css'],
        dest: '<%= site.dev %>/js/',
        flatten: false,
        filter: 'isFile',
      }
    },

    concat: {
      // options: {
      //   stripBanners: true,
      //   banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      // },
      main: {
        src: ['<%= site.prod %>/css/main.css'],
        dest: '<%= site.prod %>/css/main.css',
      },
      mainie: {
        src: ['<%= site.prod %>/css/main-ie.css'],
        dest: '<%= site.prod %>/css/main-ie.css',
      },
      js: {
          src: ['<%= site.assets %>/js/lib/*.js', '<%= site.assets %>/js/lib/iso/core.js','<%= site.assets %>/js/lib/iso/*.js', '!<%= site.assets %>/js/lib/jquery.js'],
          dest : '<%= site.prod %>/js/scripts.js',
          nonull: true
      }
    },

    uglify: {
        options: {
            // a cute way to put a banner on each uglified file
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            preserveComments:'some',
            mangle: false
        },
        prod: {
          files: [{
              expand: true,
              cwd: '<%= site.prod %>/js',
              src: '**/*.js',
              dest: '<%= site.prod %>/js'
          },{
            expand: true,
              cwd: '<%= site.assets %>/js/ie',
              src: '**/*.js',
              dest: '<%= site.prod %>/js/ie'
          },{
            expand: true,
              cwd: '<%= site.assets %>/js/lib/ie',
              src: '**/*.js',
              dest: '<%= site.prod %>/js/lib/ie'
          },{
            expand: true,
              cwd: '<%= site.assets %>/js/lib/require',
              src: '**/*.js',
              dest: '<%= site.prod %>/js/lib/require'
          },{
            expand: true,
              cwd: '<%= site.assets %>/js/lib',
              src: 'jquery.js',
              dest: '<%= site.prod %>/js/lib/'
          },
          {
            expand: true,
              cwd: '<%= site.assets %>/js/lib/shims',
              src: 'jquery.js',
              dest: '<%= site.prod %>/js/lib/shims'
          },
          {
            expand: true,
              cwd: '<%= site.assets %>/js/lib',
              src: 'modernizr.custom.js',
              dest: '<%= site.prod %>/js/lib/'
          }]
        }
    },

    watch: {
      compass: {
          files: '<%= site.assets %>/sass/**/*.scss',
          tasks: ['compass:dev'],
          options: {
              spawn: false
          }
      },
      htmlDev:{
        files: ['src/templates/**/*.*','src/data/**/*.*'],
        tasks: ['assemble','prettify'],
        options: {
            spawn: false
        }
      },
      jsDev:{
        files: ['src/assets/js/**/*.*'],
        tasks: ['copy'],
        options: {
            spawn: false
        }
      }
    },

    connect: {
      options: {
        port: 8080,
        hostname: '0.0.0.0'
      },
      dev: {
        options: {
          open: false,
          base: [
              '<%= site.dev %>'
          ]
        }
      },
      prod: {
        options: {
          open: false,
          base: [
              '<%= site.prod %>'
          ]
        }
      }
    },

    'ftp-deploy': {
      dev: '<%= ftp.dev %>'
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sprite-packer');
  grunt.loadNpmTasks('grunt-retinafy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  // Default task to be run.
  grunt.registerTask('default', ['prod', 'dev']);

  grunt.registerTask('prod', ['assemble', 'compass:prod','js','prettify']);
  grunt.registerTask('dev', ['assemble', 'compass:dev','prettify','copy:main']);


  grunt.registerTask('sass', ['compass:dev']);

  grunt.registerTask('sprites', ['mkdir','spritepacker','retinafy']);

  grunt.registerTask('js', ['concat','uglify']);

  grunt.registerTask('pretti', ['prettify']);

  grunt.registerTask('server', ['dev', 'connect:dev', 'watch']);

  grunt.registerTask('pre-deploy', function () {
    if (grunt.file.exists('.ftppass')) {
      grunt.config.set('ftp', grunt.file.readJSON(".ftppass"));
    }
    else {
      grunt.log.error('No ".ftppass" file.');
      return false;
    }
  });
  grunt.registerTask('deploy:dev', ['pre-deploy', 'dev', 'ftp-deploy:dev']);
};
