var objCourses = [
  {
    id: 1,
    name: 'MED 123'
  },
  {
    id: 5,
    name: 'MED 456'
  },
  {
    id: 4,
    name: 'POD 123'
  },
  {
    id: 3,
    name: 'NUR 456'
  },
  {
    id: 2,
    name: 'STN 666'
  },
];

var strCourses = [
  'med 1233',
  'med 4566',
  'pod 1233',
  'sur 1233',
  'dog 666',
]

var bh = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: objCourses,
});

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

$('#bloodhound .typeahead').typeahead({
  hint: true,  
  highlight: true,
  minlength: 1,
},
{
  name: 'courses',
  display: 'name',
  source: bh
});

