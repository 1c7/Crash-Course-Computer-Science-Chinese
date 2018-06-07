// Remove all {}
// Input: "{\c&HCC9933&}Subtitles by {\c\c&HFFFFFF &}MemoryOnSmells{\c} {\c&HCC9933&}Exclusive for http://UKsubtitles.ru{\c}"
// Output: "Subtitles by MemoryOnSmells  Exclusive for http://UKsubtitles.ru"
function remove_curly_brace_keep_text(str) {
  return str.replace(/\s*\{.*?\}\s*/g, ' ').trim();
}

function convertHTML(str) {
    var entityPairs = [
        {character: '&', html: '&amp;'},
        {character: '<', html: '&lt;'},
        {character: '>', html: '&gt;'},
        {character: "'", html: '&apos;'},
        {character: '"', html: '&quot;'},
    ];

    entityPairs.forEach(function(pair){
        var reg = new RegExp(pair.character, 'g');
        str = str.replace(reg, pair.html);
    });
    return str;
}

exports.remove_curly_brace_keep_text = remove_curly_brace_keep_text
exports.convertHTML = convertHTML
