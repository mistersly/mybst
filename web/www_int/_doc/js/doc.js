
(function( $ ) {

  var UiDoc = function(root){ this.init(root) };
      UiDoc.prototype = {
        init:function(root){
          this.root = root;

          this.createSource();
        },
        createSource:function(){
          function removeSpace(str){
            var tmp = str.split('\n'),
                tmp2 = '';
            for (var i = 0; i < tmp.length; i++) {
              if(tmp[i].length){
                tmp2 += tmp[i].trim()+'\n';
              }
            };
            return tmp2;
          }

          var preel = document.createElement( "pre" ),
          codeel = document.createElement( "code" ),
          wrap = document.createElement( "div" ),
          sourcepanel = document.createElement( "div" ),
          code = removeSpace(this.root.innerHTML),
          source = document.createTextNode( code );
          codeel.appendChild( source );

          preel.appendChild( codeel );

          sourcepanel.setAttribute( "class", "language-markup" );
          sourcepanel.appendChild( preel );

          this.root.nextElementSibling.appendChild( sourcepanel );
        }
      }

  document.addEventListener("DOMContentLoaded", function(){
    [].forEach.call(document.querySelectorAll('.ui_demo'),function(el){

      new UiDoc(el);
    });
    Prism.highlightAll();
  });

}( jQuery ));

