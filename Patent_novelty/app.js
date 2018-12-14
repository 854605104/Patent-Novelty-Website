const X_TOOLTIP = 'Central novelty denotes the general novelty of the technology combination embodied in a patent.';
const Y_TOOLTIP = 'Extreme novelty denotes the highest novelty of the technology combination embodied in a patent.';
const SWEET_SPOT_TOOLTIP = 'Novelty sweet spot is where the patents receive a relatively high number of future citations, which is statistically correlated with high commercialization value.';

const DEFAULT_COLOR = '#555555';
const HIGHTLIGHT_COLOR = '#f7931e';
const SWEET_SPOT_COLOR = '#0d7af7';

var column = null;
(function () {

  //UI configuration
  //var itemSize = 18,
  var itemSize = 30,
    cellSize = itemSize-1,
    width = itemSize*10+100,
    height = itemSize*10+100,
    margin = { top: 20, right: 50, bottom:50, left: 50 };

  var gridData = gridData();

    var data = null,
    colorCalibration = ['#cccccc','#e4f2df','#d3e9ce','#c3e1bf','#9ed3c0','#44a8cc','#308dbf','#1e4380'];

  //axises and scales
  var axisWidth = 0,
    axisHeight = itemSize * 10 - 10,

    xAxisScale = d3.scale.linear()
      .range([0, axisHeight+8])
      .domain([0, 100]),
    xAxis = d3.svg.axis()
      .orient('bottom')
      .ticks(10)
      .scale(xAxisScale),

    yAxisScale = d3.scale.linear()
      .range([axisHeight+4, -4])
      .domain([0, 100]),
    yAxis = d3.svg.axis()
      .orient('left')
      .ticks(10)
      .scale(yAxisScale);

  initCalibration();

  var svg = d3.select('[role="heatmap"]');
  var heatmap = svg
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr('transform', 'translate(' + 12 + ',' + 15 + ')');
  var rect = null;


  // Tooltips

  var x_tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .direction('e')
    .html(function (d) {
      return "<span>" + X_TOOLTIP + "</span>";
    })
  svg.call(x_tip);

  var y_tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .direction('w')
    .html(function (d) {
      return "<span>" + Y_TOOLTIP + "</span>";
    })
  svg.call(y_tip);

  //axisWidth = itemSize*(dayFormat(dateExtent[1])-dayFormat(dateExtent[0])+1);
  axisWidth = 800;
  var x_start = 0;
  //render axises
  //xAxis.scale(xAxisScale.range([0,axisWidth]).domain([dateExtent[0],dateExtent[1]]));  
  svg.append('g')
    .attr('transform', 'translate(46' + ',' + (itemSize*10+12) + ')')//控制横坐标轴位置
    .attr('class', 'x axis')
    .call(xAxis)
    .append('text')
    .text('Central Novelty')
    .attr('id', 'x-axis-desc')
    .attr('transform', 'translate(-5' + ',40)')//控制Text位置
    // .on('mouseover', x_tip.show)
    .on('mouseout', x_tip.hide)
    // .append('tspan')
    // .attr('baseline-shift', 'super')
    // .text('?');

  var y_start = itemSize*10;
  svg.append('g')
    // modify x-axis
    .attr('transform', 'translate(' + (margin.left-2) + ',' + margin.top + ')')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .text('Extreme Novelty')
    .attr('id', 'y-axis-desc')
    .attr('transform', 'translate(-35,' + y_start + ') rotate(-90)')
    // .on('mouseover', y_tip.show)
    .on('mouseout', y_tip.hide)
    // .append('tspan')
    // .attr('baseline-shift', 'super')
    // .text('?');

/*   d3.select('.novelty-spot-legend')
  .on('mouseover', legend_tip.show)
  .on('mouseout', legend_tip.hide); */

  d3.json('matrix_real.json', function (err, data) {

    data = data.data;
    data.forEach(function(valueObj) {
      valueObj['matrixColor'] = parseFloat(valueObj['color']);
      valueObj['x_axis']=parseInt(valueObj['x']);
      valueObj['y_axis']=parseInt(valueObj['y']);
    });
  /*
    dateExtent = d3.extent(data, function (d) {//extent使用自然排序返回指定数组的最大值和最小值
      return d.date;
    });
*/  /*
    var row = heatmap.selectAll(".row")
      .data(gridData)
      .enter().append("g")
      .attr("class", "row");

    column = row.selectAll(".square")
      .data(function (d) {
        //console.log(d);
        return d; })
      .enter().append("rect")
      .attr("id", function(d) { return 'r' + d.row + 'c' + d.column})
      .attr("class", "square")
      .attr("x", function (d) { return d.x + 1; })
      .attr("y", function (d) { return d.y + 1; })
      .attr("width", function (d) { return cellSize - 1; })
      .attr("height", function (d) { return cellSize - 1; })
      .attr('data-row', function(d) {return d.row})
      .attr('data-column', function(d) { return d.column})
      .style("fill", '#ffffff')
      .attr("stroke", function(d) {
          if(d.row === 10 && (d.column === 4 || d.column === 5 || d.column === 6 )) {
            return SWEET_SPOT_COLOR;
          }
          else {
            return 'none';
          }
      })
      .attr("stroke-width", '2px')
      .on('click', function (d) {
        d.click++;
        if ((d.click) % 4 == 0) { d3.select(this).style("fill", "#fff"); }
        if ((d.click) % 4 == 1) { d3.select(this).style("fill", "#2C93E8"); }
        if ((d.click) % 4 == 2) { d3.select(this).style("fill", "#F56C4E"); }
        if ((d.click) % 4 == 3) { d3.select(this).style("fill", "#838690"); }
      });
      */
    rect = heatmap.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('width',cellSize)
    .attr('height',cellSize)
    .attr('id',function(d) {
      return 'r' + d['y_axis'] + 'c' + d['x_axis'];
    })
    .attr("class","square")
    .attr('data-row', function(d) {return d.x_axis})
    .attr('data-column', function(d) { return d.y_axis})
    .attr('x',function(d) {
      return itemSize*(d.x_axis);
    })
    .attr('y',function(d){
      return itemSize*(10-d.y_axis);

    })
    .attr('fill','#ffffff');

    rect.filter(function(d) {return d['matrixColor']>0;})
    .append('title')
    .text(function(d){
      return d['matrixColor'];
    });

    renderColor();
  });


  function gridData() {
    var data = new Array();
    var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;
    var width = cellSize;
    var height = cellSize;

    // iterate for rows 
    for (var row = 0; row < 10; row++) {
      data.push(new Array());

      // iterate for cells/columns inside rows
      for (var column = 0; column < 10; column++) {
        data[row].push({
          x: xpos,
          y: ypos,
          width: width,
          height: height,
          row: 10 - row,
          column: column + 1
        })
        // increment the x position. I.e. move it over by 50 (width variable)
        xpos += width;
      }
      // reset the x position after a row is complete
      xpos = 1;
      // increment the y position for the next row. Move it down 50 (height variable)
      ypos += height;
    }
    return data;
  }

  function renderColor() {
    console.log("in renderColor()");
    rect
    .filter(function(d){
      return (d['matrixColor']>=0);
    })
      .transition()
      .duration(500)
      .attrTween('fill',function(d,i,a){
        console.log("Color rendering");
      var colorIndex = d3.scale.quantize()
      .range([0,1,2,3,4,5,6,7])
        .domain([0.7,1.5]);
      return d3.interpolate(a,colorCalibration[colorIndex(d['matrixColor'])]);
    });
  }

  function initCalibration() {
    d3.select('[role="calibration"] [role="example"]').select('svg')
      .selectAll('rect').data(colorCalibration).enter()
      .append('rect')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('x', function (d, i) {
        return i * itemSize;
      })
      .style('fill', function (d) {
        return d;
      });

    //bind click event
    d3.selectAll('[role="calibration"] [name="displayType"]').on('click', function () {
      renderColor();
    });
  }
  //extend frame height in `http://bl.ocks.org/`
  d3.select(self.frameElement).style("height", "600px");
})();