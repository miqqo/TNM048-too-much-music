function map(){

	var choosen = [];

    var zoom = d3.behavior.zoom()
		.scaleExtent([2, 8])
		.on("zoom", move);

	//lägg in vår map i rätt div och sätt storlek på den
	var mapDiv = $("#map");

	var margin = {top: 20, right: 0, bottom: 20, left: 20},
        width = mapDiv.width();//- margin.right - margin.left,
        height = mapDiv.height() - margin.top - margin.bottom;


    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);

	var projection = d3.geo.mercator()
        .center([10, 50 ])
        .scale(300);

    var path = d3.geo.path()
    	.projection(projection);

	//behöver g initieras på annat sätt?
	var g = svg.append("g");
	var colors = d3.scale.category20b();
	var countries = [];

	//initialize tooltip
    var tip = d3.select("#map").append("div")
        .attr("class", "tooltip")               
        .style("opacity", 0);

    d3.json("data/eu.topojson", function(error, data){
        var countries = topojson.feature(data, data.objects.europe).features;
        draw(countries);

    });



    function draw(countries){
        var country = g.selectAll(".country").data(countries);

        var colorCountry = {};
        

	   	var currentColor = "white";
	        
        country.enter().insert("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("id", function(d){ return d.id})
            .attr("title", function(d) { return d.properties.name})
            .style('stroke-width', 1)
            .style("fill", "lightgray")
            .style("stroke", "white")
            //tooltip
            .on("mousemove", function(d) {
                tip.transition()
                .duration(200)
                .style("opacity", 1);
                tip.html(d.properties.name)
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 40) + "px");    
            })
            .on("mouseout", function(d) {
                tip.transition()        
                .duration(500)      
                .style("opacity", 0);
            })
            .on("click",  function(d) {
                // choosen.push(d.properties.name.toLowerCase());
                choosen.push(d.properties.name);
                map.selectDot(choosen);

                sp1.startDrawing(choosen);

               
            });
    }

    this.selectDot = function(value){
        d3.selectAll(".country")
         .style("fill",function(d){  
            if( value.indexOf(d.properties.name) != -1) return "red";      
            else return "lightgray";
         });
    }

    //zoom and panning method
    function move() {

        var t = d3.event.translate;
        var s = d3.event.scale;

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }

    //on click, reset data
    d3.select("h4")
        .on("click", function() {
            for(var i = 0; i < choosen.length; i++){
                choosen[i] = "";
            }
            map.selectDot(choosen)
        });

}

