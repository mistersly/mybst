$spriteWidth: {{width}};
$spriteHeight: {{height}};
$spriteWidthPx: {{width}}px;
$spriteHeightPx: {{height}}px;

{{#with sprites.[1]}}
%_sprites {
  background-image: url('{{../baseUrl}}sprites@1.png?#{$spriteWidth}#{$spriteHeight}');
  background-repeat: no-repeat;
  @media only screen and (-webkit-min-device-pixel-ratio: 2),
    only screen and (-moz-min-device-pixel-ratio: 2),
    only screen and (-o-min-device-pixel-ratio: 2/1),
    only screen and (min-device-pixel-ratio: 2) {
      background-size: round($spriteWidthPx/2) round($spriteHeightPx/2);
      background-image: url('{{../baseUrl}}sprites@2.png?#{$spriteWidth}#{$spriteHeight}');
  }
}
{{/with}}
{{#sprites}}
%_sprite-{{name}}{
  background-position: (-{{x}}px/2) (-{{y}}px/2);
  width: ({{width}}px/2);
  height: ({{height}}px/2);
}
{{/sprites}}

