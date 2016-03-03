function sp(){
	

    var self = this; // for internal d3 functions

    var spDiv = $("#sp");

    var margin = {top: 20, right: 200, bottom: 30, left: 40},
        width = spDiv.width() - margin.right - margin.left,
        height = spDiv.height() - margin.top - margin.bottom;

    
    //initialize tooltip
    var tip = d3.select("#sp").append("div")
        .attr("class", "tooltip")               
        .style("opacity", 0);

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("#sp").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
   // drawAxes()
    this.startDrawing = function(countries){

    	//Load data
	    d3.csv("data/sum-artist-data.csv", function(error, data) {
	        self.predata = data;
	        self.data = [];
	        
	        self.predata.forEach(function(d){
                for(var i = 0; i < countries.length; i++){
                       if(d["Country"] == countries[i]){
                        self.data.push(d); 
                    }
	            }
	        })             

            x.domain([0 , 5]);
            y.domain([0 , 1]);
       
           drawDots();
	    });
    }
    self.startDrawing("");

   
    
    function drawDots(){

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6);

        // Add y axis and title.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em");

        // Add x-axis label
        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width/1.5)
            .attr("y", height + 30)
            .text("speechiness");

        // Add y-axis label
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -40)
            .attr("x", -100)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Life satisfaction");

		svg.selectAll("circle")
		  .data(self.data)
		  .enter()
		  .append("circle")
		  .attr("cx", function(d) {
		    return x(d["energy"]);
		  })
		  .attr("cy", function(d) {
		    return y(d["speechiness"])
		  })
		  .attr("r", function(d) {
		    return 5;
		  })
		  .attr("fill", "#00aa88");

    }
	
}




