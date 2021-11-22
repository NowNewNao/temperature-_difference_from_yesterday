import moment from 'moment';
import queryString from 'query-string';
import fetch from 'node-fetch';

const fetchWeather = async () => {
    const getTimelineURL = 'https://api.tomorrow.io/v4/timelines';

    const apikey = 'EBECyhpbQmP957PPq45lFvUlxTD1P7Dt';
    let location = [40.758, -73.9855];

    const fields = [
        'precipitationIntensity',
        'precipitationType',
        'windSpeed',
        'windGust',
        'windDirection',
        'temperature',
        'temperatureApparent',
        'cloudCover',
        'cloudBase',
        'cloudCeiling',
        'weatherCode',
    ];

    const units = 'imperial';
    const timesteps = ['current', '1h', '1d'];
    const now = moment.utc();
    const startTime = moment.utc(now).add(0, 'minutes').toISOString();
    const endTime = moment.utc(now).add(1, 'days').toISOString();

    const timezone = 'America/New_York';

    const getTimelineParameters = queryString.stringify(
        {
            apikey,
            location,
            fields,
            units,
            // timesteps,
            startTime,
            endTime,
            timezone,
        },
        { arrayFormat: 'comma' }
    );

    const res = await fetch(getTimelineURL + '?' + getTimelineParameters, {
        method: 'GET',
    })
        .then((result) => result.json())
        .then((json) => console.log(json));
    console.log(res)

    return res;
};

export { fetchWeather };
