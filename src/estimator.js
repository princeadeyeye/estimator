const convertToDays = (periodType, timeToEllapse) => {
  switch (periodType) {
    case 'days':
      return timeToEllapse;
    case 'weeks':
      return timeToEllapse * 7;
    case 'months':
      return timeToEllapse * 30;
    default:
      return timeToEllapse;
  }
};
const impactCovid = (data) => {
  const {
    reportedCases,
    totalHospitalBeds,
    periodType,
    timeToElapse,
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation }
  } = data;
  const impact = {};
  let {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    severeAvBeds,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  } = impact;
  currentlyInfected = reportedCases * 10;
  infectionsByRequestedTime = Math.trunc(
    currentlyInfected
      * 2 ** Math.trunc(convertToDays(periodType, timeToElapse) / 3)
  );
  severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  severeAvBeds = 0.35 * totalHospitalBeds;
  hospitalBedsByRequestedTime = Math.trunc(severeAvBeds - severeCasesByRequestedTime);
  casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
  casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
  dollarsInFlight = Math.trunc((infectionsByRequestedTime * avgDailyIncomeInUSD
    * avgDailyIncomePopulation) / convertToDays(periodType, timeToElapse));
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const severeCovid = (data) => {
  const {
    reportedCases,
    totalHospitalBeds,
    periodType,
    timeToElapse,
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation }
  } = data;
  const severeImpact = {};
  let {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    severeAvBeds,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  } = severeImpact;
  currentlyInfected = reportedCases * 50;
  infectionsByRequestedTime = Math.trunc(
    currentlyInfected
      * 2 ** Math.trunc(convertToDays(periodType, timeToElapse) / 3)
  );
  severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  severeAvBeds = 0.35 * totalHospitalBeds;
  hospitalBedsByRequestedTime = Math.trunc(severeAvBeds - severeCasesByRequestedTime);
  casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
  casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
  dollarsInFlight = Math.trunc((infectionsByRequestedTime
    * avgDailyIncomeInUSD * avgDailyIncomePopulation) / convertToDays(periodType, timeToElapse));
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => {
  const impact = impactCovid(data);
  const severeImpact = severeCovid(data);
  return ({
    data,
    impact,
    severeImpact
  });
};

export default covid19ImpactEstimator;
