let sql_import_export =
  'name LIKE "%Johnny%" AND (category = 2 OR in_stock = 1)';

let rules_basic = {
  condition: "AND",
  rules: [
    {
      id: "price",
      operator: "less",
      value: 10.25,
    },
    {
      condition: "OR",
      rules: [
        {
          id: "category",
          operator: "equal",
          value: 2,
        },
        {
          id: "category",
          operator: "equal",
          value: 1,
        },
      ],
    },
  ],
};

const objCourses = [
  {
    id: 1,
    name: "MED 123",
  },
  {
    id: 5,
    name: "MED 456",
  },
  {
    id: 4,
    name: "POD 123",
  },
  {
    id: 3,
    name: "NUR 456",
  },
  {
    id: 2,
    name: "STN 666",
  },
];

$(function(){
  $('#SQLin').text(sql_import_export);
  $('#JSONin').text(JSON.stringify(rules_basic, null,2));
})



$("#builder").queryBuilder({
  plugins: [
    //"bt-tooltip-errors", 
    //"not-group"
  ],
  display_empty_filter: false,
  default_filter: 'name',
  operators: ['equal'],
  icons: {
    add_group: "bi bi-plus-square",
    add_rule: "bi bi-plus-circle",
    remove_group: "bi bi-dash-square",
    remove_rule: "bi bi-dash-circle",
    error: "bi bi-exclamation-triangle",
  },
  templates: {
    group: `
<div id="{{= it.group_id }}" class="rules-group-container w-75">
  <div class="rules-group-header d-flex justify-content-between">
    <div class="btn-group order-1 group-actions">
      <button type="button" class="btn btn-sm btn-success" data-add="rule">
        <i class="{{= it.icons.add_rule }}"></i> {{= it.translate("add_rule") }}
      </button>
      {{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }}
        <button type="button" class="btn btn-sm btn-success" data-add="group">
          <i class="{{= it.icons.add_group }}"></i> {{= it.translate("add_group") }}
        </button>
      {{?}}
      {{? it.level>1 }}
        <button type="button" class="btn btn-sm btn-danger" data-delete="group">
          <i class="{{= it.icons.remove_group }}"></i> {{= it.translate("delete_group") }}
        </button>
      {{?}}
    </div>
    <div class="btn-group group-conditions order-0">
      {{~ it.conditions: condition }}
        <label class="btn btn-sm btn-primary">
          <input type="radio" name="{{= it.group_id }}_cond" value="{{= condition }}"> {{= it.translate("conditions", condition) }}
        </label>
      {{~}}
    </div>
    {{? it.settings.display_errors }}
      <div class="error-container"><i class="{{= it.icons.error }}"></i></div>
    {{?}}
  </div>
  <div class=rules-group-body>
    <div class=rules-list></div>
  </div>
</div>`,
    rule: `
<div id="{{= it.rule_id }}" class="rule-container d-flex justify-content-between"> 
  <div class="rule-action-container order-1">
    <div class="rule-header">
      <div class="btn-group pull-right rule-actions">
        <button type="button" class="btn btn-sm btn-danger" data-delete="rule">
          <i class="{{= it.icons.remove_rule }}"></i> {{= it.translate("delete_rule") }}
        </button>
      </div>
    </div>
  </div>
  <div class="fov-container order-0">
    {{? it.settings.display_errors }}
      <div class="error-container"><i class="{{= it.icons.error }}"></i></div>
    {{?}}
    <div class="rule-filter-container"></div>
    <div class="rule-operator-container"></div>
    <div class="rule-value-container"></div>
  </div>
</div>`,
  filterSelect: `<input type='hidden' value='{{= it.filters[0].id }}' />`,
  operatorSelect: `<input type='hidden' value='{{= it.operators[0].type }}' />`,
  ruleValueSelect: `
{{ var optgroup = null; }}
<select class="form-control" name="{{= it.name }}" {{? it.rule.filter.multiple }}multiple{{?}}>
  {{? it.rule.filter.placeholder }}
    <option value="{{= it.rule.filter.placeholder_value }}" disabled selected>{{= it.rule.filter.placeholder }}</option>
  {{?}}
  {{~ it.rule.filter.values: entry }}
    {{? optgroup !== entry.optgroup }}
      {{? optgroup !== null }}</optgroup>{{?}}
      {{? (optgroup = entry.optgroup) !== null }}
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}">
      {{?}}
    {{?}}
    <option value="{{= entry.value }}">{{= entry.label }}</option>
  {{~}}
  {{? optgroup !== null }}</optgroup>{{?}}
</select>`
  },
  filters: [
    {
      id: "name",
      label: "Course",
      type: "integer",
      input: "select",
      values: {
        1: "MED 123",
        2: "SURG 123",
        3: "PEDS 123",
        4: "NEUR 234",
        5: "MED 456"
      },

    }
  ],
});

$("#btn-reset").on("click", function () {
  $("#builder").queryBuilder("reset");
});

$("#btn-set-sql").on("click", function () {
  $("#builder").queryBuilder("setRulesFromSQL", sql_import_export);
});

$('#btn-set-json').on('click', function() {
  $('#builder').queryBuilder('setRules', rules_basic);
});

$("#btn-export").on("click", function () {
  var result = $("#builder").queryBuilder("getSQL", false);

  if (result.sql.length) {
    $('#SQLout').text(result.sql);
  }

  result = $('#builder').queryBuilder('getRules');

  if (!$.isEmptyObject(result)) {
    $('#JSONout').text(JSON.stringify(result, null, 2));
  }
});

$("#btn-get-sql").on("click", function () {
  var result = $("#builder").queryBuilder("getSQL", false);

  if (result.sql.length) {
  $('#SQLout').text(result.sql);
  }
});

$('#btn-get-json').on('click', function() {
  var result = $('#builder').queryBuilder('getRules');
  
  if (!$.isEmptyObject(result)) {
    $('#JSONout').text(JSON.stringify(result, null, 2));
  }
});