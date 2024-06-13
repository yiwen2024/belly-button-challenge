// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // get the metadata field
    let metadata = data.metadata;
    
    // Filter the metadata for the object with the desired sample number
    let filtered_Data = metadata.filter(x => x.id == sample);
    
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Access the first result 
    let fil_data_list = filtered_Data[0];

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (key in fil_data_list){
      panel.append('div').text(`${key.toUpperCase()}:${fil_data_list[key]}`);

     };
     })};
  

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples

    // Filter the samples for the object with the desired sample number
    let filtered_samples = samples.filter(i=>i.id ==sample)
    let fil_sample_list = filtered_samples[0]

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = fil_sample_list.otu_ids;
    let otu_labels = fil_sample_list.otu_labels;
    let sample_values = fil_sample_list.sample_values;
    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);


// Build a Bubble Chart
let bubbleChart = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: 'Earth'
    }
}];

let bubbleChart_display = {
    title: 'Bacterial Culture Per Sample',
    xaxis: { title: 'OTU ID' },
    yaxis: {title: 'Number of Bacteria'},
    hovermode: 'closest',
    height: 650,
    width: 1350
};

Plotly.newPlot('bubble', bubbleChart, bubbleChart_display);


//For the Bar Chart, map the otu_ids to a list of strings for your yticks
// Build a Bar Chart
// Don't forget to slice and reverse the input data appropriately
  

  let yticks = otu_ids.map(otu_id => `otu ${otu_id}`).slice(0, 10).reverse();
  let barChart = [{
      y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
  }];

  let barChart_display = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { 
      l: 100,
      r: 20,
      t: 50,
      b: 80}
  };

  Plotly.newPlot("bar", barChart, barChart_display);

});
}; 

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of ``
    let dropdown = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (key in names){
      dropdown.append('option').text(`${names[key]}`)
    }

    // Get the first sample from the list
    let sample = data.samples[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(sample.id)
    buildCharts(sample.id)

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample)
  buildCharts(newSample)
}

// Initialize the dashboard
init();


