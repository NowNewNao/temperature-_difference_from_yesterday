import fetch from 'node-fetch';

// set the Insights POST endpoint as the target URL
const postInsightsURL = "https://api.tomorrow.io/v4/insights";

// get your key from app.tomorrow.io/development/keys
const apikey = "add your API key here";

// describe insight details, later detailed in the webhook payload
let name = "Monitor Conditions: Moderate Snow";

const severity = "moderate";

const description = "Possible risk for limited activities capacity and demand surge - Light Snow";

const tags = ["winter", "snow", "surge"];

// compile insight conditions, using >80 data points
const conditions = {
    "type": "OPERATOR",
    "content": {
        "operator": "AND"
    },
    "children": [
        {
            "type": "OPERATOR",
            "content": {
                "operator": "AND"
            },
            "children": [
                {
                    "type": "OPERATOR",
                    "content": {
                        "operator": "GREATER_EQUAL"
                    },
                    "children": [
                        {
                            "type": "PARAMETER",
                            "content": {
                                "parameter": "precipitationIntensity"
                            }
                        },
                        {
                            "type": "CONST",
                            "content": {
                                "const": 0
                            }
                        }
                    ]
                },
                {
                    "type": "OPERATOR",
                    "content": {
                        "operator": "LESS"
                    },
                    "children": [
                        {
                            "type": "PARAMETER",
                            "content": {
                                "parameter": "precipitationIntensity"
                            }
                        },
                        {
                            "type": "CONST",
                            "content": {
                                "const": 2
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "OPERATOR",
            "content": {
                "operator": "GREATER"
            },
            "children": [
                {
                    "type": "PARAMETER",
                    "content": {
                        "parameter": "precipitationType"
                    }
                },
                {
                    "type": "CONST",
                    "content": {
                        "const": 2
                    }
                }
            ]
        }
    ]
};

const postInsightsParameters = {
  name,
  severity,
  description,
  tags,
  conditions
};

// create an insight with use-case specific rules
fetch(postInsightsURL + "?apikey=" + apikey, {
  method: "POST",
  body: JSON.stringify(postInsightsParameters),
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((json: any) => {

    // set the Alerts POST endpoint as the target URL
    const postAlertsURL = "https://api.tomorrow.io/v4/alerts";

    // choose an insight category, such as fires, winter or temperature
    const insight = json.data.insight.id;

    // specify the name and notification details, later detailed in the webhook payload
    let name = "Moderate Snow in Pacific Central Station, Vancouver";

    const notifications = [
      {
        type: "PRIOR",
        value: 120,
        title: "Monitor: Moderate Snow Expected within 2 Hours",
        description:
          "Look out for surge caused by incoming moderate snow (<2mm).",
      },
      {
        type: "END",
        title: "All Clear: Moderate Snow Ended",
        description:
          "Back to normal, snowfall has ended.",
      },
    ];

    // create an insight-based alert with all the body parameters as options
    const postAlertsParameters = {
      name,
      insight,
      // isActive: true, (default to true)
      notifications,
    };

    fetch(postAlertsURL + "?apikey=" + apikey, {
      method: "POST",
      body: JSON.stringify(postAlertsParameters),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json:any) => {

        // set the Alerts Locations Link POST endpoint as the target URL
        const postAlertsLocationsLinksURL =
          "https://api.tomorrow.io/v4/alerts/" +
          json.data.alert.id +
          "/locations/link";

        // name a pre-defined location by its ID
        const locationId = "59f35a7f65d7a20007abb096";

        // link the location to the alert, so it will start monitoring for the weather events
        fetch(postAlertsLocationsLinksURL + "?apikey=" + apikey, {
          method: "POST",
          body: JSON.stringify({
            locations: [locationId],
          }),
          headers: { "Content-Type": "application/json" },
        })
          .catch((err) => console.error("error: " + err));
      })
      .catch((err) => console.error("error: " + err));
  });