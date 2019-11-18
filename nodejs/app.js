var restql = require('@b2wdigital/restql')

// executeQuery(mappings, query, params, options) => <Promise>
restql
  .executeQuery(
    { 
      launches: "https://api.spacexdata.com/v3/launches/:flight_number",
      capsules:"https://api.spacexdata.com/v3/capsules"
   },
    `from launches as  searchinfo
       with flight_number = $number
       only 
       details,launch_date_unix,flight_number
       hide
       from capsules 
       with capsules.missions.flight = searchinfo.flight_number
       `,
    { number: 33 })
  .then(response => {
    let result = response;
    console.log(result)
  }
  )
  .catch(error => console.log(error));

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
});