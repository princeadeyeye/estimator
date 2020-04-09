const impactCovid = (data) => {
  const { reportedCases, totalHospitalBeds, periodType } = data;
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
  infectionsByRequestedTime = periodType === 'days' ? currentlyInfected * 1024 : currentlyInfected * 512;
  severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  severeAvBeds = 0.35 * totalHospitalBeds;
  remainbeds = severeCasesByRequestedTime - severeAvBeds;
  hospitalBedsByRequestedTime = (severeAvBeds > severeCasesByRequestedTime)
    ? severeAvBeds : remainbeds;
  casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  casesForVentilatorsByRequestedTime = 0.02 * infectionsByRequestedTime;
  dollarsInFlight = infectionsByRequestedTime * 1 * 1.5 * 30;
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    severeAvBeds,
    remainbeds,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const severeCovid = (data) => {
  const { reportedCases, totalHospitalBeds, periodType } = data;
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
  infectionsByRequestedTime = periodType === 'days' ? currentlyInfected * 1024 : currentlyInfected * 512;
  severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  severeAvBeds = 0.35 * totalHospitalBeds;
  remainbeds = severeCasesByRequestedTime - severeAvBeds;
  hospitalBedsByRequestedTime = (severeAvBeds > severeCasesByRequestedTime)
    ? severeAvBeds : remainbeds;
  casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  casesForVentilatorsByRequestedTime = 0.02 * infectionsByRequestedTime;
  dollarsInFlight = infectionsByRequestedTime * 1 * 1.5 * 30;
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    severeAvBeds,
    remainbeds,
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
