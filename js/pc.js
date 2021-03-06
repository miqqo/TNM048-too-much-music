function pc(){

    var self = this;

    var pcDiv = $("#pc");

    var margin = [30, 10, 10, 10],
        width = pcDiv.width() - margin[1] - margin[3],
        height = pcDiv.height() - margin[0] - margin[2];
    
    //initialize tooltip
    var tip = d3.select("#pc").append("div")
        .attr("class", "tooltip")               
        .style("opacity", 0);

    var x = d3.scale.ordinal().rangePoints([0, width], 1);
      //  y = {};
    var y = d3.scale.linear()
        .range([height, 0]);
        

    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        background,
        foreground;

    var svg = d3.select("#pc").append("svg:svg")
        .attr("width", width + margin[1] + margin[3])
        .attr("height", height + margin[0] + margin[2])
        .attr("id","pc_svg")
        .append("svg:g")
        .attr("transform", "translate(" + margin[3] + "," + margin[0] + ")");

    var counter = 0;
    var currentCountry = "";
    var colorArray = {};


    this.startDrawing = function(artist){
        console.log(artist);
        counter++;
        // Artist, title, acousticness, tempo, danceability, energy, instrumentalness, speechiness
        d3.csv("data/song-data.csv", function(data) {

            // Extract the list of dimensions and create a scale for each.
            x.domain(dimensions = d3.keys(data[0]).filter(function(d) {
                return (d != "title" && d != "Artist") &&  (
                y[d] = d3.scale.linear().domain(d3.extent(data, function(p){
                    return +p[d];
                }))
                .range([height, 0]));
            }));

            self.fullData = data;
            self.data = [];
            //hämta ut aktuell data
            self.fullData.forEach(function(d){
                if(d.Artist == artist){
                    self.data.push(d);
                }
            })


            draw();
            self.setColor();
        });

    }

    self.startDrawing("");

  /*  function drawAxes(){


    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6);


    }*/

    function draw(){

        background = svg.append("svg:g")
            .attr("class", "background")
            .selectAll("path")
            .data(self.data)
            .enter()
            .append("svg:path")
            .attr("d", path)
            .on("mousemove", function(d){})
            .on("mouseout", function(){});

        foreground = svg.append("svg:g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(self.data)
            .enter()
            .append("svg:path")
            .attr("d", path)
            .on("mousemove", function(d){
                tip.transition()
                .duration(200)
                .style("opacity", 1);
                tip.html(d.title)
                .style("left", (d3.event.pageX + 20) + "px")     
                .style("top", (d3.event.pageY + 30) + "px");    
            })
            .on("mouseout", function(d){
                tip.transition()        
                .duration(200)      
                .style("opacity", 0);
            })
            .on("click", function(d){
                self.selectLine(d.title);
                self.setColor();

            });

    /*var test = d3.select("#pc_svg")
            .selectAll("path")
        test.exit().remove();*/


        // Add a group element for each dimension.
        var g = svg.selectAll(".dimension")
            .data(dimensions)
            .enter().append("svg:g")
            .attr("class", "dimension")
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; });
            
        // Add an axis and title.
        g.append("svg:g")
            .attr("class", "axis")
            //add scale
            .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
            .append("svg:text")
            .attr("text-anchor", "middle")
            .attr("y", -9)
            .text(String);

         
    }

     // Returns the path for a given data point.
    function path(d) {
        return line(dimensions.map(function(p) {
         return [x(p), y[p](d[p])]; }));
    }

    this.selectLine = function(value){
        d3.select("#pc_svg")
            .selectAll("path")
            .style("opacity", function(d){
                if(d.title == value)
                    return 1;
                else return 0.3;
                })
    };

    this.updateData = function(country, artist, theColorArray){

        //hämta ut aktuell data
        self.fullData.forEach(function(d){
            if(d.Artist == artist){
                self.data.push(d);
            }
        });

  //      draw();

        var svg = d3.select('#pc').select("svg").selectAll('path').data(self.data);
            svg.enter().append('svg:path')
                    .attr('d', line)
            svg.attr('d', line)
            svg.exit().remove(); 

        currentCountry = country;
        colorArray = theColorArray;
        self.setColor();

    }

    this.setColor = function(){

        d3.select("#pc_svg")
            .selectAll("path")
            .style("stroke",colorArray[currentCountry]);

    }

}
