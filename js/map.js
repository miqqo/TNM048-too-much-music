function map(){

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
       /* .style("fill", function(d, i){
                return colors(d.properties.name);
            })*/
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
          //  .on("click", );
            .on("click",  function(d) {
            	//detta ska skickas vidare till scatterplot!
            //	d3.select(current).style("fill", "lightgray");
              //  current = d3.select(this).style("fill", "red");
              	selectCountry(d.properties.name);
               // loadData();
                pc1.startDrawing();
                sp1.startDrawing(d.properties.name);
               
                console.log(d.properties.name);


            });
    }

    function selectCountry(value){

    	d3.selectAll(".country")
    	.style("fill",function(d){
            if(d.properties.name == value){
                return "red";
            }
            else return "lightgray";
        })
    }

    //zoom and panning method
    function move() {

        var t = d3.event.translate;
        var s = d3.event.scale;

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }

}

