let data; // Declare data ... I complete believe that actually worked
let data_1;

// Fetch data and create the dropdown menu
fetch('../va_states_op.json')
  .then(response_1 => response_1.json())
  .then(jsonData_1 => {
    data_1 = jsonData_1; // Assign the fetched data to the outer "data" variable
    const dropdownMenu = d3.select("#selCount");
    
    const CountyNames = [...new Set(data_1.map(item_1 => item_1.BUYER_COUNTY))];

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
  const filteredData_1 = data_1.filter(item_1 => item_1.BUYER_COUNTY === selectedCounty);
  
  // Extract year and dosage_unit values for the selected county
  const years_1 = filteredData_1.map(item_1 => item_1.Year);
  const dosageUnits_1 = filteredData_1.map(item_1 => item_1.DOSAGE_UNIT);

  // Create the bar chart using Plotly
  const CompanyPlot = {
    x: years_1,
    y: dosageUnits_1,
    type: 'bar',
    name: 'Opioid Sales',
    opacity: 0.7,
    marker: {
      color: 'pink',
    },
  };

  const layout = {
    title: 'Opioid Sale by Year',
    xaxis: {
      title: 'Year',
    },
    yaxis: {
      title: 'Dosage Units',
    },
  };

  Plotly.newPlot('bar', [CompanyPlot], layout);
}

///////////////////////////////////////////////////////////////////////////////

// // Fetch data and create the dropdown menu
// fetch('../va_opioid_company.json')
//   .then(response => response.json())
//   .then(jsonData => {
//     data = jsonData; // Assign the fetched data to the outer "data" variable
//     const dropdownMenu = d3.select("#selCompany");
    
//     const CompanyNames = [...new Set(data.map(item => item.Combined_Labeler_Name))];

//     // Create the dropdown menu listing county names
//     dropdownMenu
//       .selectAll("option")
//       .data(CompanyNames)
//       .enter()
//       .append("option")
//       .text(companyname => companyname)
//       .attr("value", companyname => companyname);

//     // Call the optionChanged function with the initial value
//     optionChanged(CompanyNames[0]);
//   });

// // Define the optionChanged function
// function optionChanged(selectedCompany) {
//   // Filter data for the selected county
//   const filteredData = data.filter(item => item.Combined_Labeler_Name === selectedCompany);
  
//   // Extract year and dosage_unit values for the selected county
//   const years = filteredData.map(item => item.Year);
//   const dosageUnits = filteredData.map(item => item.DOSAGE_UNIT);

//   // Create the bar chart using Plotly
//   const CompanyPlot = {
//     x: years,
//     y: dosageUnits,
//     type: 'bar',
//     name: 'Opioid Sales',
//     opacity: 0.7,
//     marker: {
//       color: 'pink',
//     },
//   };

//   const layout = {
//     title: 'Opioid Sale by Year',
//     xaxis: {
//       title: 'Year',
//     },
//     yaxis: {
//       title: 'Dosage Units',
//     },
//   };

//   Plotly.newPlot('bar_1', [CompanyPlot], layout);
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

