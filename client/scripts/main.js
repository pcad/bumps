/**
*   Main Configuration
*/

require.config({
    baseUrl: './scripts',
    paths : {
      'lodash':'../bower_components/lodash/dist/lodash',
        'd3': '../bower_components/d3/d3'
    }
});

require(['app', 'lodash', 'd3', 'data/db'], function (app, lo, d3, db) {

    function getMonth(mnth, year, obj){
      return obj[year] && obj[year][mnth] || null;
    }
    // grab the n latest items
    var i, nSites, ids, sites, nMonths;

    nSites = 10;
    var sortFacet = 'Count';
    nMonths = 10;
    var segment = "14.10";
    var segments = segment.split(".");
    var sought = db, i = 0, sorted;

    while(i < segments.length){
      sought = sought[segments[i]];
      i++;
    }

    sorted = lo.sortBy(sought, sortFacet).reverse();
    sorted = sorted.slice(0, nSites);
    ids = _.object(_.pluck(sorted, 'Name'), sorted);
    sites = _.map(sorted, function(inst){
        return {
          name : inst.Name,
          rankings : []
        }
    });


    var endMonth, endYear, startMonth, currMonth, startYear, currYear, monthsCounted = 0, activeMonth;

    endMonth = parseInt(segments[1]);
    endYear = parseInt(segments[0]);
    currYear = startYear = endYear - Math.floor(nMonths/12);

    if (startYear == endYear){
      currMonth = startMonth = endMonth - nMonths + 1;
    } else {
      currMonth = startMonth = endMonth + 1;
    }

    while (currMonth <= endMonth || currYear <= endYear){

      activeMonth = getMonth(currMonth, currYear, db);
      if (!activeMonth) {
        break;
      }
        activeMonth = _.sortBy(activeMonth, sortFacet);
      activeMonth = _.object(_.pluck(activeMonth, 'Name'), activeMonth);

      lo.forEach(sites, function(site){
        var item = activeMonth[site.name];
        lo.assign(item, {
          month : currMonth,
          year : currYear
        })
        site.rankings.push(item);
      });

      if (currMonth == 12){
        currMonth = 1;
        currYear++;
      } else {
        currMonth++;
      }
    }

    //console.log(sites);

    var header = lo.map(sites[0].rankings, function(timeUnit){
        return timeUnit && timeUnit.month+"/"+timeUnit.year || "N/A";
    });

    var buffer = [];

    buffer.push("Name | "+ header.join(" | ")+"\n");


    lo.forEach(sites, function(site){
        var row = lo.map(site.rankings, function(rank){
          return rank && rank.Rank || "-";
        }).join(" | ");
        buffer.push(site.name+ " | "+row+"\n");
    });

    //console.log(buffer.join(""));

    app.init();

    // draw the chart.

    var margin, height, width, names, x, y, xAxis, yAxis, svg, optSummaryTicks;

    var svg = d3.select(document.getElementById('canvas')).append("svg")



    optSummaryTicks = optSummaryTicks || false;
    margin = {top: 20, right: 20, bottom: 30, left: 150};
    width = Math.max(nMonths * 100, 800);
    height = Math.max(nSites * 40, 800);

    svg
        .attr("width", width + margin.left)
        .attr("height", height + margin.bottom)
        .append("g")

    // scaling
    x = d3.scale.ordinal()
        // what does range round bands do?
        .rangeRoundBands([0, width], .1);

    x.domain(header);

    y = d3.scale.ordinal()
        // what does range round bands do?
        .rangeRoundBands([height, 0]);

    names = _.map(sites, 'name').reverse();
    y.domain(names);

    xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(function (d) {
            return d;
        })
        .ticks(nMonths)
        .orient("bottom");

    yAxis = d3.svg.axis()
        .scale(y)
        .tickFormat(function (d) {
            return d;
        })
        .ticks(nSites)
        .orient("left");

    // axis
    svg.append("g")

        .attr("class", "axis")
        .attr("class", "x axis")
        .attr("transform", "translate(150," + (height - margin.bottom) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("class", "y axis")
        .attr("transform", "rotate(-90)")
        .attr("transform", "translate("+margin.left+", -10)")
        .call(yAxis);

    console.log($("#canvas"));
});
