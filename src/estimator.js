const impactCovid = (data) => {
  const { reportedCases, totalHospitalBeds } = data;
  const impact = {};
  let {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    severeAvBeds,
    remainbeds,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  } = impact;
  currentlyInfected = reportedCases * 10;
  infectionsByRequestedTime = currentlyInfected * 512;
  severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  severeAvBeds = 0.35 * totalHospitalBeds;
  remainbeds = severeCasesByRequestedTime - severeAvBeds;
  hospitalBedsByRequestedTime = (severeAvBeds > severeCasesByRequestedTime)
    ? severeAvBeds : remainbeds;
  casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  casesForVentilatorsByRequestedTime = 0.02 * infectionsByRequestedTime;
  dollarsInFlight = infectionsByRequestedTime * 1 * 1.5 * 30;
  return {
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    }
  };
};

const severeCovid = (data) => {
  const { reportedCases, totalHospitalBeds } = data;
  const severeImpact = {};
  let {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    severeAvBeds,
    remainbeds,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  } = severeImpact;
  currentlyInfected = reportedCases * 50;
  infectionsByRequestedTime = currentlyInfected * 512;
  severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  severeAvBeds = 0.35 * totalHospitalBeds;
  remainbeds = severeCasesByRequestedTime - severeAvBeds;
  hospitalBedsByRequestedTime = (severeAvBeds > severeCasesByRequestedTime)
    ? severeAvBeds : remainbeds;
  casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  casesForVentilatorsByRequestedTime = 0.02 * infectionsByRequestedTime;
  dollarsInFlight = infectionsByRequestedTime * 1 * 1.5 * 30;
  return {
    severeImpact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    }
  };
};

const covid19ImpactEstimator = () => {
  const data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };
  const impact = impactCovid(data);
  const severeImpact = severeCovid(data);
  return ({
    data,
    impact,
    severeImpact
  });
};
console.log(covid19ImpactEstimator());

// export default covid19ImpactEstimator;
