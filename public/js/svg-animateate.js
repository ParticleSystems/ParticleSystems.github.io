var svgElem;


var embedSvg = function () {
    setTimeout(function () {
        var xhr = new XMLHttpRequest;
        xhr.open('get', 'img/workflow-small-plain1.svg', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            var svg = xhr.responseXML.documentElement;
            svg = cloneToDoc(svg);
            svg.classList.add('svg');
            window.svgRoot = svg; // For reference by scripts
            document.querySelector('.svgParent').appendChild(svg);
            delete window.svgRoot;
            // animate();
        };
        xhr.send();
    }, 1000);



}


function cloneToDoc(node, doc) {
    if (!doc) doc = document;
    var clone = doc.createElementNS(node.namespaceURI, node.nodeName);
    for (var i = 0, len = node.attributes.length; i < len; ++i) {
        var a = node.attributes[i];
        if (/^xmlns\b/.test(a.nodeName)) continue; // IE can't create these
        clone.setAttributeNS(a.namespaceURI, a.nodeName, a.nodeValue);
    }
    for (var i = 0, len = node.childNodes.length; i < len; ++i) {
        var c = node.childNodes[i];
        clone.insertBefore(
            c.nodeType == 1 ? cloneToDoc(c, doc) : doc.createTextNode(c.nodeValue),
            null
        )
    }
    return clone;
}


function matrixXY(m,x,y) {
    return { x: x * m.a + y * m.c + m.e, y: x * m.b + y * m.d + m.f
};
}

function animate() {
    svgElem = document.querySelector('#particle-svg');
    var c1i1 = svgElem.querySelector('#circle1-icon1');
    var c1b1 = svgElem.querySelector('#circle1-bg1');


    window.setInterval(function () {
        // var pos = c1b1.getBoundingClientRect();
        var ctm = c1b1.getCTM();
        console.log(ctm);
        
        var bb = c1b1.getBBox();
        var tpts = [
            matrixXY(ctm,bb.x,bb.y),
             matrixXY(ctm,bb.x+bb.width,bb.y),
             matrixXY(ctm,bb.x+bb.width,bb.y+bb.height),
             matrixXY(ctm,bb.x,bb.y+bb.height) ];
         
             console.log(tpts);

        // var x = pos.left + bsspos.width/2, y = pos.top + pos.height/2;

        console.log(c1b1);
        // var x = c1b1.cx.baseVal.value, y = c1b1.cy.baseVal.value;n

        c1i1.setAttribute("transform", "translate(" +  tpts[4].x + ", " + tpts[4].y + ")");
        // c1i1.setAttribute("style", 'top: ' + y + 'px; left: ' + x + 'px');
    }, 300);




    // window.setInterval(function () {
    //     var pos = c1b1.getBBox();
        
    //     middleX = pos.x + (pos.width / 2),
    //     middleY = pos.y + (pos.height / 2);

    //     var convert = makeAbsoluteContext(c1b1, svgElem);
    //     var absoluteCenter = convertCoords(middleX, middleY);

    //     c1i1.setAttribute('cx', absoluteCenter.x);
    //     c1i1.setAttribute('cy', absoluteCenter.y);


    //     // c1i1.setAttribute("transform", "translate(" +  x + ", " + y + ")");
    //     // c1i1.setAttribute("style", 'top: ' + y + 'px; left: ' + x + 'px');
    // }, 300);

}

///////////////////////////////////
function makeAbsoluteContext(element, svgDocument) {
    return function(x,y) {
      var offset = svgDocument.getBoundingClientRect();
      var matrix = element.getScreenCTM();
      return {
        x: (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
        y: (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
      };
    };
  }


  function convertCoords(x,y) {

    var offset = svgElem.getBoundingClientRect();
  
    var matrix = svgElem.getScreenCTM();
  
    return {
      x: (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
      y: (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
    };
  }



// var bbox = elem.getBBox(),
//     middleX = bbox.x + (bbox.width / 2),
//     middleY = bbox.y + (bbox.height / 2);

// // generate a conversion function
// var convert = makeAbsoluteContext(elem, svgDoc);

// // use it to calculate the absolute center of the element
// var absoluteCenter = convert(middleX, middleY);

// var dot = svg.append('circle')
//   .attr('cx', absoluteCenter.x)
//   .attr('cy', absoluteCenter.y)
//   .attr('r', 5);

