const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

 let data2 = d3.json(url).then(function(data){
    console.log(data);
    
   
    var selector = d3.select("#selDataset");
    var sampleName = data.names;
    sampleName.forEach((sample)=> {
        selector.append("option").text(sample).property("value",sample);
    

    var firstSample = sampleName[0];
    Charts(firstSample);
    Metadata(firstSample);

     
function Charts(firstSample){
    
    var sampledata = data.samples;
    var sampledataArray = sampledata.filter(sampleObj => sampleObj.id == firstSample);
    var sampleresult = sampledataArray[0];
    console.log(sampleresult);

    let sortedByOtuid = sampleresult.otu_ids.sort((a, b) => b.otu_ids - a.otu_ids);
    slicedData = sortedByOtuid.slice(0, 10);
    reverseData = slicedData.reverse();
    let sortedBySampleValues = sampleresult.sample_values.sort((a, b) => b.sample_values - a.sample_values);
    slicedData2 = sortedBySampleValues.slice(0, 10);
    reverseData2 = slicedData2.reverse();
    let trace1 = {
        x: reverseData2,
        y: reverseData.map(object => `OTU ${object}`),
        text: reverseData.map(object => object.otu_labels),
        type: "bar",
        orientation: "h"
    };
    let traceData = [trace1];
    let layout = {
        title: "Top 10 OTUs",
        margin: {
            l:100,
            r:100,
            t:100,
            b:100
        }
    };
    Plotly.newPlot("bar", traceData, layout);

   var bubbleData = [{
    x:sampleresult.otu_ids,
    y:sampleresult.sample_values,
    text: sampleresult.otu_labels,
    mode:"markers",
    marker:{
        size: sampleresult.sample_values,
        color: sampleresult.otu_ids
    }
   }]; 

   var bubbleLayout =[{
    title: "Bacteria Values by Size",
    xaxis: {title: "OTU ID"}
   }];

   Plotly.newPlot("bubble", bubbleData, bubbleLayout);
}
 
function Metadata(firstSample){
    var metadata = data.metadata;
    var metadataArray = metadata.filter(sampleObj => sampleObj.id == firstSample);
    var result = metadataArray[0];

    var PANEL = d3.select(`#sample-metadata`);
    Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h4").text(`${key}: ${value}`);
    });
    console.log(result);
} 


    


});
