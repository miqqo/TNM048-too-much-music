function sp(){
	// var self = this;

	var w = 800;
	var h = 400;

	var scale = d3.scale.linear();



	var dataset = [
	  [256, 60], [480, 270], [250, 150], [100, 99], [330, 285],
	  [410, 36], [475, 132], [25, 180], [85, 63], [220, 240]
	];

	var xScale = d3.scale.linear()
 	    .domain([0, d3.max(dataset, function(d) { return d[0]; })])
        .range([10, w-50]);

    var yScale = d3.scale.linear()
         .domain([0, d3.max(dataset, function(d) { return d[1]; })])
         .range([h-50, 50]);


	//Create SVG element
	var svg = d3.select("#sp")
	  .append("svg")
	  .attr("width", w)
	  .attr("height", h);


	// Define x- and yAxis
	var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom");

    var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(5);

	// Create x- and yAxis
	svg.append("g")
	    .attr("class", "axis")
	    .attr("transform", "translate(10," + (h - 20) + ")")
	    .call(xAxis);


	svg.append("g")
	    .attr("class", "axis")
	    .attr("transform", "translate(20,30)")
	    .call(yAxis);

	
	svg.selectAll("circle")
	  .data(dataset)
	  .enter()
	  .append("circle")
	  .attr("cx", function(d) {
	    return xScale(d[0]);
	  })
	  .attr("cy", function(d) {
	    return yScale(d[1]);
	  })
	  .attr("r", function(d) {
	    return Math.sqrt(h - d[1]);
	  })
	  .attr("fill", "#00aa88");

	svg.selectAll("text")
	  .data(dataset)
	  .enter()
	  .append("text")
	  .text(function(d) {
	    return d[0] + "," + d[1];
	  })
	  .attr("x", function(d) {
	    return xScale(d[0]);
	  })
	  .attr("y", function(d) {
	    return yScale(d[1]);
	  })
	  .attr("font-size", "15px")
	  .attr("fill", "black");

}




