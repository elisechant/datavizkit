### Single Category Single Slice:

`@todo - example`


### Single Category Many Slice:

    <LineWidget title='Number of page views'
                units='number'
                type='column'
                dateLastUpdated='22 Feb 2016'
                minimumValue="20000"
                xAxis={[
                  {"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov"]}
                ]}
                series={[
                  {"name":"Time to clear","data":[84807,48317,51420,62400,48060,37560,39300]}
                ]}
                singleCategory={false} 
                singleSection={true} />
        

### Many Category Single Slice:

`@todo - example`


### Many Category Many Slice:


    <LineWidget title='Number of page views'
                units='number'
                type='column'
                dateLastUpdated='22 Feb 2016'
                minimumValue="20000"
                xAxis={[
                  {"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov"]}
                ]}
                series={[
                  {"name":"Time to clear","data":[84807,null,51420,62400,48060,37560,39300]},
                  {"name":"Time to fish","data":[48060,null,39300,84807,null,51420,62400]}
                ]}
                singleCategory={false} 
                singleSection={true} 
                chartDescription="" />

