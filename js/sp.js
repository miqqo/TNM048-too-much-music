function sp(){
    var self = this; // for internal d3 functions
    var spDiv = $("#sp");

    var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = spDiv.width() - margin.right - margin.left,
    height = spDiv.height() - margin.top - margin.bottom;

    console.log("width: " + spDiv.width())

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
    var colorArray ={};

    document.getElementById("artist").innerHTML = "";


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

    // Add x-axis label
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width/1.5)
        .attr("y", height + 40)
        .text("Total energy");

    // Add y-axis label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -48)
        .attr("x", -100)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Total speechiness");

    //Load data
    this.startDrawing = function(countries, currentCountry, colorCountry){ 
      colorArray = colorCountry;
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
           	.duration(100)
           	.style("opacity", 1);
         	
          tip .html(d.Artist)
         	  .style("left", (d3.event.pageX - 150) + "px")     
            .style("top", (d3.event.pageY-1000) + "px");   
         })
         .on("mouseout", function(d) {
         	tip.transition()        
           	.duration(500)      
           	.style("opacity", 0);
         })
         .on("click",  function(d) {

         	self.selectDot(d.Country, d.Artist);
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
    this.selectDot = function(country, artist){
    	
    	//om det är en ny artist: rensa data i pc
    	if(clickedDot != artist && clickedDot != "null"){
    		pc1.updateData(country, artist, colorArray);
    	}

      

    	d3.selectAll("circle")
    	.style("opacity",function(d){
    		if(d.Artist == artist){
    			clickedDot = artist;
    			return 1;
    		}
    		else return 0.5;
    	})

      //kolla hur långt namnet är
      document.getElementById("artist").innerHTML = artist;

    };

    this.updateData = function(countries, colorCountry){
    	var exists = false, currentCountry = false;
      if(countries.length < 1){
          self.data = [];
          document.getElementById("artist").innerHTML = "";
      }
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
    	       	.style("left", (d3.event.pageX - 150) + "px")     
              .style("top", (d3.event.pageY-1000) + "px");  
	       })
	       .on("mouseout", function(d) {
  	       	tip.transition()        
    	       	.duration(500)      
    	       	.style("opacity", 0);
	       })
	       .on("click",  function(d) {
	       	self.selectDot(d.Country, d.Artist);
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


