### How to adjust the matrix?

The *matrix_real.json* contains the data which adjusts the matrix's color distribution.

```
{
      "x": "1",
      "y": "10",
      "color": "1.227589"
    },
```

This is the format of the the data, the x and y is the position of the rectangle and the value of the color contributing to its color. Changing the color's value, so that you can adjust the matrix.

The corresponding code in app.js is:

```
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
```

