mybst
=====



This highlights some real-word usage of:

1. Compass
1. Uglify
1. Grunt
1. Sprites



1. Make sure you have node and npm installed and setup. If you do, the following
2 commands should work.

    ```
    node -v
    npm -v
    ```

    If these don't work, ya know, install them!

2. Use npm to install bower, compass and grunt-cli

    ```
    sudo npm install -g bower
    sudo npm install -g compass
    sudo npm install -g grunt-cli
    ```

3. Download the bower dependencies:

    ```
    bower install (project directory)
    ```

    This should give you a populated `web/assets/vendor` directory.

4. Install Ruby, Compass , imagemagick

    [Ruby](http://www.ruby-lang.org/en/downloads/)
    [Sass](http://sass-lang.com/tutorial.html)
    [imagemagick] http://www.imagemagick.org/script/binary-releases.php#windows

5. Download the local node dependencies:

    ```
    npm install
    ```

    This should give you a `node_modules` directory.
