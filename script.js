svg = d3.selectAll('svg');
canvas = document.getElementById('canvas');
context = canvas.getContext("2d");

scaleX = d3.scaleLinear().domain([-2,2]).range([50,900]);
scaleY = d3.scaleLinear().domain([0,10]).range([50,450]);

var dataIn = [];

d3.csv('./PewDatafromSavReader_cut.csv', function(d){
    d.forEach(function(e){
        console.log(e);
        e.points = [{number:1, value: e.hh1},{number:2, value: e.hh3},{number:3, value: e.party}];
        dataIn.push(e);
    });

    console.log(dataIn);
    draw();
});

function draw(){
    data = [[{number:1, value:2},{number:2, value:0},{number:3, value:1},{number:4, value:-2}],
        [{number:1, value:-1},{number:2, value:2},{number:3, value:0},{number:4, value:-2}]];

    svg.selectAll('circs')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx',function(d){return scaleX(d.value)})
        .attr('cy',function(d){return scaleY(d.number)})
        .attr('r', 10)
        .attr('fill','purple');

// define the line
    var svgPath = d3.line()
        .curve(d3.curveMonotoneY)
        .x(function(d) { return scaleX(d.value); })
        .y(function(d) { return scaleY(d.number); });

    var canvasPath = d3.line()
        .x(function(d) { return scaleX(d.value); })
        .y(function(d) { return scaleY(d.number); })
        .curve(d3.curveMonotoneY)
        .context(context);

    console.log(data);
    console.log([data]);
    console.log([dataIn]);

    allPaths = svg.selectAll('path')
        .data(function(d,i){return [data][i]})
        .enter();

    path = allPaths.append('path')
        .attr('d', svgPath)
        .attr('fill','none')
        .attr('stroke',"green");

    var totalLength = path.node().getTotalLength();

    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

    data.forEach(function(d){
        context.beginPath();
        canvasPath(d)//(data[0]);
        context.lineWidth = 1.5;
        context.strokeStyle = "steelblue";
        context.stroke();
    });

}

