module.exports.register = function (Handlebars, options) {
  options = options || {};

  Handlebars.registerHelper('dynamictemplate', function (template, context, opts) {
    template = template.replace(/\//g, '_');

    var partial = Handlebars.partials[template];

    if (!partial) {
      return "Partial not loaded";
    }

    var fn = Handlebars.compile(partial);

    return new Handlebars.SafeString(fn(context, opts));
  });
};
