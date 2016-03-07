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

    // create scale functions
    var x = d3.scale.linear()
    .range([0, width])
    .domain([0 , 5]);

    var y = d3.scale.linear()
    .range([height, 0])
    .domain([0 , 1]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

    var clickedDot = "null";

    // Create SVG element
    var svg = d3.select("#sp").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate("+1+"," + 0 +")")
    .call(yAxis);

    //Load data
    this.startDrawing = function(countries, currentCountry, colorCountry){ 
    	d3.csv("data/sum-artist-data.csv", function(error, data) {
    		self.predata = data;
    		self.data = [];

    		self.predata.forEach(function(d){
    			for(var i = 0; i < countries.length; i++){
    				if(d["Country"] == countries[i])
    					self.data.push(d);   
    			}
    		})             

    		drawDots();
    		setColor(countries, colorCountry);

    	});
    }
    self.startDrawing("");

    function drawDots(){

    	svg.selectAll("circle")
    	.data(self.data)
    	.enter()
    	.append("circle")
    	.attr("class", "dot")
    	.attr("cx", function(d) {
    		return x(d["energy"]);
    	})
    	.attr("cy", function(d) {
    		return y(d["speechiness"])
    	})
    	.attr("r", function(d) {
    		return 7;
    	})
    	.attr("fill", "#00aa88")
       //tooltip
       .on("mousemove", function(d) {
       	tip.transition()
       	.duration(200)
       	.style("opacity", 1);
       	tip .html(d.Artist)
       	.style("left", (d3.event.pageX - 250) + "px")     
       	.style("top", (d3.event.pageY - 80) + "px");    
       })
       .on("mouseout", function(d) {
       	tip.transition()        
       	.duration(500)      
       	.style("opacity", 0);
       })
       .on("click",  function(d) {

       	self.selectDot(d.Artist);
       	pc1.startDrawing(d.Artist);

       });

   }

   function setColor(value, colorCountry){

   	d3.selectAll("circle")
   	.style("fill",function(d){  
   		if( value.indexOf(d.Country) != -1){
   			return colorCountry[d.Country];        
   		} 
   	});

   }

    //method for selecting the dot from other components
    this.selectDot = function(value){
    	
    	//om det är en ny artist: rensa data i pc
    	if(clickedDot != value && clickedDot != "null"){
    		pc1.updateData(value);
    	}

    	d3.selectAll("circle")
    	.style("opacity",function(d){
    		if(d.Artist == value){
    			clickedDot = value;
    			return 1;
    		}
    		else return 0.5;
    	})

    };

    this.updateData = function(countries, colorCountry){
    	var exists = false, currentCountry = false;
    	if(countries[0] == "")
    		self.data = [];
        //hämta ut aktuell data
        self.predata.forEach(function(d){
        	for(var j = 0; j < countries.length; j++){
        		if(d.Country == countries[j]){
        			currentCountry = true;
        			self.data.forEach(function(p){
        				if(d.Artist == p.Artist)
        					exists = true;
        			})
        		}
        	}

        	if(!exists && currentCountry)
        		self.data.push(d);

        	exists = false;
        	currentCountry = false;
        })


        var svg = d3.select('#sp')
	        .select("svg")
	        .selectAll('circle')
	        .data(self.data);
	        svg.enter()
	        .append('svg:circle')
	        .attr("class", "dot")
	        .attr("cx", function(d) {
	        	return x(d["energy"]);
	        })
	        .attr("cy", function(d) {
	        	return y(d["speechiness"])
	        })
	        .attr("r", function(d) {
	        	return 7;
	        })
	        .attr("fill", "#00aa88")
	       //tooltip
	       .on("mousemove", function(d) {
	       	tip.transition()
	       	.duration(200)
	       	.style("opacity", 1);
	     tip .html(d.Artist)
	       	.style("left", (d3.event.pageX - 250) + "px")     
	       	.style("top", (d3.event.pageY - 80) + "px");    
	       })
	       .on("mouseout", function(d) {
	       	tip.transition()        
	       	.duration(500)      
	       	.style("opacity", 0);
	       })
	       .on("click",  function(d) {

	       	self.selectDot(d.Artist);
	       	pc1.startDrawing(d.Artist);

	       });
	       svg.exit().remove(); 

	    setColor(countries, colorCountry);

	   }

	self.resetDots = function(){
			var svg = d3.select('#sp')
	        .select("svg")
	        .selectAll('circle');
	   
	        svg.exit().remove;
		}

}


