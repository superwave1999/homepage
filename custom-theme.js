const custColours = {
    lightCompany: '#90CC1F',
    darkCompany: '#a3cb59',
    lightText: '#0A090B',
    darkText: '#FFF5EB',
    lightBg: '#FFF5EB',
    darkBg: '#0A090B',
    lightBgAlpha: '#FFF5EBbb',
    darkBgAlpha: '#0A090Bbb'
};

const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
for(const key in custColours){
    const colourToSet = custColours[key];
    custColours[key] = {};
    weights.forEach((number) => {
        custColours[key][number] = colourToSet;
    });
}

export default {
    fonts: {
      heading: 'RalewayVariable, sans-serif',
      body: 'ArchivoVariable, sans-serif'
    },
    colors: custColours
}

