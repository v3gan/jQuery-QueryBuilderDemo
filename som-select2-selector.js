/**
 * @description Applies select2 Select on input combo-boxes.
 * @param {object} [options] Supports all the options for select2
 * @throws MissingLibraryError
 */
$.fn.queryBuilder.define("som-select2-selector", function (options) {
  if (!$.fn.select2) {
    console.error(
      "Missing Library: ",
      'select2 is required to use "som-select2-selector" plugin'
    );
    alert('ERROR: select2 is required to use "som-select2-selector" plugin');
    return false;
  }

  // fix auto-focus not working as of jQuery >= 3.6
  $(document).on("select2:open", (e) => {
    const id = e.target.id;
    const target = $(`[aria-controls=select2-${id}-results]`)[0];
    console.log(id);
    target.focus();
  });

  // init select picker
  this.on("afterCreateRuleInput", function (e, rule) {
    let k = rule.$el
      .find(".course-select")
      .removeClass("form-control")
      .select2(options);
    //console.log(k);
  });

  this.on("beforeDeleteRule", function (e, rule) {
    rule.$el.find(".course-select").select2("destroy");
  });
});
