var fs = require('fs');
var stdio = require('stdio');

var typeset = {
  config:{ type:'default' },
  output:'',
}

var ops = stdio.getopt({
  'input': {key: 'i', args: 1, description: 'Input file with typesetting information.'},
  'template': {key: 't', args: 1, description: 'Template file set. Example: default'}
});
if (ops.input) { var input = ops.input; }
typeset.image  = input;

if (ops.template) { typeset.config.type = ops.template; }
typeset.template = fs.readFileSync(typeset.config.type+'.template', 'utf8');
typeset.config = JSON.parse(fs.readFileSync(typeset.config.type+'.config', 'utf8'));
if (fs.existsSync(input+'.config')) {
  typeset.config  = JSON.parse(fs.readFileSync(input+'.config', 'utf8'));
} else {
  typeset.config = JSON.parse(fs.readFileSync(typeset.config.type+'.config', 'utf8'));
}

// create table of items
typeset.table = '';
for(i=0;i<typeset.config.rows;i++) {
  typeset.table += '<div class="col">';
  for(j=0;j<typeset.config.columns;j++) {
    typeset.table += '<div class="obj"><img src="'+typeset.image+'" /></div>';
  }
  typeset.table += '</div>';
}

typeset.output = replaceBulk(typeset.template,
              ['{{typesetTemplate}}','{{countColumns}}','{{countRows}}',
               '{{pageMarginTop}}','{{pageMarginLeft}}','{{pageMarginRight}}',
               '{{objWidth}}','{{objHeight}}',
               '{{objMarginTop}}','{{objMarginBottom}}','{{objMarginLeft}}','{{objMarginRight}}',
               '{{typesetTable}}'],
              [typeset.image,typeset.config.columns,typeset.config.rows,
               sc(typeset.config.pageMarginTop),sc(typeset.config.pageMarginLeft),sc(typeset.config.pageMarginRight),
               sc(typeset.config.objWidth),sc(typeset.config.objHeight),
               sc(typeset.config.objMarginTop),sc(typeset.config.objMarginBottom),sc(typeset.config.objMarginLeft),sc(typeset.config.objMarginRight),
               typeset.table]);

console.log(typeset.output);

//
// helper functions
//

function replaceBulk( str, findArray, replaceArray ){
  var i, regex = [], map = {}; 
  for( i=0; i<findArray.length; i++ ){ 
    regex.push( findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g,'\\$1') );
    map[findArray[i]] = replaceArray[i]; 
  }
  regex = regex.join('|');
  str = str.replace( new RegExp( regex, 'g' ), function(matched){
    return map[matched];
  });
  return str;
}

// scaler

function sc(input) {
  let sizedata = input.split(' ');
  return sizedata[0]*typeset.config.scaler+sizedata[1];
}
