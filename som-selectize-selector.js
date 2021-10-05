/**
 * @description Applies select2 Select on input combo-boxes.
 * @param {object} [options] Supports all the options for select2
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
    let k = rule.$el
      .find(".course-select")
      .removeClass("form-control")
      .selectize(options);
    //k[0].selectize.focus();
    console.log(k);
  });

  this.on("beforeDeleteRule", function (e, rule) {
    rule.$el.find(".course-select")[0].selectize.destroy();
  });
});
