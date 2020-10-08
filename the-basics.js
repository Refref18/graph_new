var substringMatcher = function (strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, "i");

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function (i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

var abc = httpGet("localhost:8080");

function parseAll() {
  var obj = JSON.parse(abc);
  list = [];
  var myMap = new Map();
  for (product in obj.products) {
    var p = obj.products[product];
    list.push(p.title);
    myMap.set(p.title, p.url);
  }
  return list, myMap;
}

var states,
  myMap = parseAll();

$("#the-basics .typeahead").typeahead(
  {
    hint: true,
    highlight: true,
    minLength: 1,
  },
  {
    name: "states",
    source: substringMatcher(states),
  }
);

function findUrl() {
  let title = document.querySelector(".inputPart").value.toUpperCase();
  if (myMap.has(title)) {
    var url = myMap.get(title);
    var c = JSON.parse(httpGet(url));
    addgrp(c);
  }
}
//Data is represented as an array of {x,y} pairs.
function datePrice(data) {
  var list = [];
  for (var i in data.merchants) {
    var priceList = [];
    var obj = { key: data.merchants[i].merchantUrl };
    for (var j in data.merchants[i].prices) {
      priceList.push({
        x: Date.parse(data.merchants[i].prices[j].date),
        y: data.merchants[i].prices[j].price,
      });
    }
    obj.values = priceList;
    list.push(obj);
  }
  return list;
}

function addgrp(lst) {
  nv.addGraph(function () {
    var chart = nv.models
      .lineChart()
      .margin({ left: 100 }) //Adjust chart margins to give the x-axis some breathing room.
      .useInteractiveGuideline(true) //We want nice looking tooltips and a guideline!

      .showLegend(true) //Show the legend, allowing users to turn on/off line series.
      .showYAxis(true) //Show the y-axis
      .showXAxis(true); //Show the x-axis
    chart.xAxis //Chart x-axis settings
      .axisLabel("Time (ms)")
      .tickFormat(function (d) {
        return d3.time.format("%b %d %H:%M:%S")(new Date(d));
      });

    chart.yAxis //Chart y-axis settings
      .axisLabel("Voltage (v)")
      .tickFormat(d3.format(".02f"));

    /* Done setting the chart up? Time to render it!*/
    var myData = lst; //You need data...

    d3.select("#chart svg") //Select the <svg> element you want to render the chart in.
      .datum(myData) //Populate the <svg> element with chart data...
      .call(chart); //Finally, render the chart!

    //Update the chart when window resizes.
    nv.utils.windowResize(function () {
      chart.update();
    });
    return chart;
  });
}
