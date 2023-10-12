let data;
 // Declare data ... I complete believe that actually worked

// Fetch data and create the dropdown menu
fetch('../va_states_op.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData; // Assign the fetched data to the outer "data" variable
    const dropdownMenu = d3.select("#selCount");
    
    const CountyNames = [...new Set(data.map(item => item.BUYER_COUNTY))];

    // Create the dropdown menu listing county names
    dropdownMenu
      .selectAll("option")
      .data(CountyNames)
      .enter()
      .append("option")
      .text(countyname => countyname)
      .attr("value", countyname => countyname);

    // Call the optionChanged function with the initial value
    optionChanged(CountyNames[0]);
  });

// Define the optionChanged function
function optionChanged(selectedCounty) {
  // Filter data for the selected county
  const filteredData = data.filter(item => item.BUYER_COUNTY === selectedCounty);
  
  // Extract year and dosage_unit values for the selected county
  const years = filteredData.map(item => item.Year);
  const dosageUnits = filteredData.map(item => item.DOSAGE_UNIT);

  // Create the bar chart using Plotly
  const CountyPlot = {
    x: years,
    y: dosageUnits,
    type: 'bar',
    name: 'Opioid Consumption',
    opacity: 0.7,
    marker: {
      color: 'pink',
    },
  };

  const layout = {
    title: 'Opioid Consumption by Year',
    xaxis: {
      title: 'Year',
    },
    yaxis: {
      title: 'Dosage Units',
    },
  };

  Plotly.newPlot('bar', [CountyPlot], layout);
}

