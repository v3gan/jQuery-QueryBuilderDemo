/**
 * @description Applies selectize on input combo-boxes.
 * @param {object} [options] Supports all the options for selectize
 * @throws MissingLibraryError
 */
$.fn.queryBuilder.define("som-selectize-selector", function (options) {
  if (!$.fn.selectize) {
    console.error(
      "Missing Library: ",
      'selectize is required to use "som-selectize-selector" plugin'
    );
    alert('ERROR: selectize is required to use "som-selectize-selector" plugin');
    return false;
  }

  // init select picker after creating a rule input
  this.on("afterCreateRuleInput", function (e, rule) {
    console.log('afterCreateRuleInput');
    let k = rule.$el
      .find(options.somSelectSelector)
      .removeClass("form-control")
      .selectize(options);
  });

  this.on("beforeDeleteRule", function (e, rule) {
    rule.$el.find(options.somSelectSelector)[0].selectize.destroy();
  });

  // this.on('afterInit', function (rule) {
  //   console.log('init');
  // });
});
