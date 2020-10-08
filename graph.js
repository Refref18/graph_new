data = {
  merchants: [
    {
      merchantUrl: "http://www.dr.com.tr/",
      prices: [
        { date: "2020-10-07T11:46:03.839Z", price: 11.7 },
        { date: "2020-10-07T11:32:11.543Z", price: 11.7 },
      ],
    },
    {
      merchantUrl: "https://www.pttavm.com",
      prices: [
        { date: "2020-10-07T11:46:03.833Z", price: 14.4 },
        { date: "2020-10-07T11:32:11.535Z", price: 14.4 },
      ],
    },
    {
      merchantUrl: "https://www.trendyol.com/",
      prices: [
        { date: "2020-10-07T11:46:03.869Z", price: 12.8 },
        { date: "2020-10-07T11:32:11.567Z", price: 12.8 },
      ],
    },
    {
      merchantUrl: "http://www.idefix.com/",
      prices: [
        { date: "2020-10-07T11:46:03.856Z", price: 11.7 },
        { date: "2020-10-07T11:32:11.556Z", price: 11.7 },
      ],
    },
    {
      merchantUrl: "https://www.ciceksepeti.com/",
      prices: [
        { date: "2020-10-07T11:46:03.847Z", price: 31.2 },
        { date: "2020-10-07T11:32:11.548Z", price: 31.2 },
      ],
    },
    {
      merchantUrl: "https://www.isemkitap.com/",
      prices: [
        { date: "2020-10-07T11:46:03.852Z", price: 12.0 },
        { date: "2020-10-07T11:32:11.553Z", price: 12.0 },
      ],
    },
    {
      merchantUrl: "http://www.gittigidiyor.com/",
      prices: [
        { date: "2020-10-07T11:46:03.860Z", price: 12.91 },
        { date: "2020-10-07T11:32:11.560Z", price: 12.91 },
      ],
    },
    {
      merchantUrl: "https://www.akmkitap.com/",
      prices: [
        { date: "2020-10-07T11:46:03.871Z", price: 12.0 },
        { date: "2020-10-07T11:32:11.571Z", price: 12.0 },
      ],
    },
    {
      merchantUrl: "http://www.boyner.com.tr/",
      prices: [
        { date: "2020-10-07T11:46:03.874Z", price: 18.0 },
        { date: "2020-10-07T11:32:11.574Z", price: 18.0 },
      ],
    },
    {
      merchantUrl: "http://www.n11.com",
      prices: [
        { date: "2020-10-07T11:46:03.865Z", price: 20.16 },
        { date: "2020-10-07T11:32:11.563Z", price: 20.16 },
      ],
    },
  ],
  url:
    "https://www.cimri.com/genel-konular/en-ucuz-aylak-adam-yusuf-atilgan-9789750735646-fiyatlari,42466422",
};

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
  var myData = datePrice(); //You need data...

  d3.select("#chart svg") //Select the <svg> element you want to render the chart in.
    .datum(myData) //Populate the <svg> element with chart data...
    .call(chart); //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function () {
    chart.update();
  });
  return chart;
});

//Data is represented as an array of {x,y} pairs.
function datePrice() {
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

//Line chart data should be sent as an array of series objects.
