function sp(){
    var self = this; // for internal d3 functions
    var spDiv = $("#sp");

     var margin = {top: 20, right: 200, bottom: 30, left: 40},
        width = spDiv.width() - margin.right - margin.left,
        height = spDiv.height() - margin.top - margin.bottom;

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
    this.startDrawing = function(countries){ 
        d3.csv("data/sum-artist-data.csv", function(error, data) {
            self.predata = data;
            self.data = [];
                
            self.predata.forEach(function(d){
                for(var i = 0; i < countries.length; i++){
                       if(d["Country"] == countries[i].toLowerCase())
                            self.data.push(d);   
                }
            })             

            drawDots();
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
             .style("top", (d3.event.pageY - 40) + "px");    
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

    //method for selecting the dot from other components
    this.selectDot = function(value){

        d3.selectAll("circle")
        .style("opacity",function(d){
            if(d.Artist == value){
                return 1;
            }
            else return 0.3;
        })

    };

}


