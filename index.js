const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json());


const fs = require('fs')

const auth =(req,res,next)=>{
    const authHeader = req.headers['x-auth-token'];
    if(authHeader == '12fdAEI0nd' ){
        next()
}
else{
    res.status(400).json({
        messages:'Authorization Error',
        type:'ERROR'
    })
}
}

app.get('/app/auth',(req,res)=>{

    fs.writeFileSync('auth.json',JSON.stringify(req.query))
    res.status(200).send('success')

})

app.get('/app/load',(req,res)=>{

    res.status(200).sendFile((__dirname +'/index.html'))

})


app.post('/check_connection_options',(req,res)=>{

    res.status(200).json(
        {
            "valid": true,
            "messages": [
              {
                "text": "test",
                "type": "INFO"
              }
            ]
          }
    )
})

app.post('/rate',(req,res)=>{

    res.status(200).json(
        {
            "quote_id": "Test_123",
            "messages": [
              {
                "text": "This is a test message",
                "type": "INFO"
              }
            ],
            "carrier_quotes": [
              {
                "quotes": [
                  {
                    "code": "GND_001",
                    "display_name": "Express Shipping",
                    "cost": {
                      "currency": "USD",
                      "amount": 100.0
                    },
                    "messages": [
                      {
                        "text": "No additional notes",
                        "type": "INFO"
                      }
                    ],
                    "description": "Fast delivery",
                    "rate_id": "Rate_001",
                    "discounted_cost": {
                      "currency": "USD",
                      "amount": 90.0
                    },
                    "dispatch_date": new Date((new Date()).valueOf() + (3 * 24 *3600*1000)).toISOString(),
                    "transit_time": {
                      "units": "DAYS",
                      "duration": 3
                    }
                  },
                  {
                    "code": "GND_002",
                    "display_name": "Standard Shipping",
                    "cost": {
                      "currency": "USD",
                      "amount": 50.0
                    },
                    "messages": [
                      {
                        "text": "Delivery may take longer than express",
                        "type": "WARNING"
                      }
                    ],
                    "description": "Reliable delivery",
                    "rate_id": "Rate_002",
                    "discounted_cost": {
                      "currency": "USD",
                      "amount": 45.0
                    },
                    "dispatch_date": new Date((new Date()).valueOf() + (3 * 24 *3600*1000)).toISOString(),
                    "transit_time": {
                      "units": "DAYS",
                      "duration": 5
                    }
                  }
                ],
                "carrier_info": {
                  "code": "Carrier_001",
                  "display_name": "FastShipping Inc."
                }
              },
              
            ]
          }
          
    )
})

app.listen(8081,()=>{
    console.log('app listing on 8081')
})