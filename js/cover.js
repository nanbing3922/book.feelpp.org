// Custom cover
// modify svg tags via key/value object.
function modcover( kv ) {
    //alert(this.responseText);
    response = this.responseXML;
    svg = response.documentElement;
    if( kv.bgcolor != null ) {
        elt = svg.getElementById("svg_book_bg");
        elt.style.fill=kv.bgcolor;
    }
    if( kv.bgbandcolor != null ) {
        elt = svg.getElementById("svg_book_bg_band");
        elt.style.fill=kv.bgbandcolor;
    }
    if( kv.title0 != null ) {
        elt = svg.getElementById("svg_book_text_title");
        elt.childNodes[0].childNodes[0].textContent = kv.title0;
    }
    if( kv.title1 != null ) {
        elt = svg.getElementById("svg_book_text_title");
        elt.childNodes[1].childNodes[0].textContent = kv.title1;
    }
    if( kv.subtitle != null ) {
        elt = svg.getElementById("svg_book_text_subtitle");
        elt.childNodes[0].childNodes[0].textContent = kv.subtitle;
    }
    if( kv.id != null ) {
        document.getElementById(kv.id).appendChild(svg);
    }
}

function loadFile( url, timeout, callback) {
    var args = Array.prototype.slice.call(arguments,3);
    var xhr = new XMLHttpRequest();
    xhr.ontimeout = function () {
        console.error("The request for " + url + " timed out.");
    };
    xhr.onload = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback.apply(xhr, args);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.timeout = timeout;
    xhr.send(null);
}

// cover({ bgcolor:"red"
//         title1:"toto" })
// see modcover for details
var cover = function( kv={} ) {
    svgfile="/images/book_cover_simple.svg"
    loadFile(svgfile, 2000, modcover, kv);
}
