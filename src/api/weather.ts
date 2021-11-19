const fetchWeather = async () => {
    const res = await fetch('https://api.tomorrow.io/v4/timelines').then(
        (response) => response.json()
    );

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
    // const now = moment.utc();
    // const startTime = moment.utc(now).add(0, 'minutes').toISOString();
    // const endTime = moment.utc(now).add(1, 'days').toISOString();

    return { res };
};

export { fetchWeather };
