function map(){

	var choosen = [];
    var colorCountry = {};

    var zoom = d3.behavior.zoom()
		.scaleExtent([2, 8])
		.on("zoom", move);

	//lägg in vår map i rätt div och sätt storlek på den
	var mapDiv = $("#map");

	var margin = {top: 20, right: 0, bottom: 20, left: 20},
        width = mapDiv.width();//- margin.right - margin.left,
        height = mapDiv.height() - margin.top - margin.bottom;  

        //initialize tooltip
    var tip = d3.select("#map").append("div")
        .attr("class", "tooltip")               
        .style("opacity", 0);

    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);
        //.call(zoom);

	var projection = d3.geo.mercator()
        .center([80, 50 ])
        .scale(300);

    var path = d3.geo.path()
    	.projection(projection);

	//behöver g initieras på annat sätt?
	var g = svg.append("g");
	var colors = d3.scale.category10();
	var countries = [];
    var counter = 0;

    d3.json("data/eu.topojson", function(error, data){
        var countries = topojson.feature(data, data.objects.europe).features;
        draw(countries);

    });



    function draw(countries){
        var country = g.selectAll(".country").data(countries);

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
                .style("left", (d3.event.pageX-1000) + "px")     
                .style("top", (d3.event.pageY - 950) + "px");    
            })
            .on("mouseout", function(d) {
                tip.transition()        
                .duration(500)      
                .style("opacity", 0);
            })
            .on("click",  function(d) {
                choosen.push(d.properties.name);
                map.selectCountry(choosen);

                if(counter == 0){
                    sp1.startDrawing(choosen, d.properties.name, colorCountry);
                }
                else{ sp1.updateData(choosen, colorCountry);}
                counter++;
               
            });
    }

    this.selectCountry = function(value){
        value.forEach(function(d){
            colorCountry[d] = colors(d);
        });
        d3.selectAll(".country")
         .style("fill",function(d){  
            if( value.indexOf(d.properties.name) != -1){
              return colorCountry[d.properties.name];        
            } 
            else return "lightgray";
         });
    }

    //zoom and panning method
    function move() {

        var t = d3.event.translate;
        var s = d3.event.scale;

       // zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }

    //on click, reset data
    d3.select("button")
        .on("click", function() {
            choosen = [];
            map.selectCountry(choosen)
            sp1.updateData(choosen, colorCountry);
            pc1.updateData("");

        });

}

