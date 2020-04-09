const inputData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToEllapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

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

// eslint-disable-next-line no-underscore-dangle
const _estimate = (data = inputData) => {
  const {
    reportedCases,
    periodType,
    timeToEllapse,
    totalHospitalBeds,
    region: { avgDailyInUSD, avgDailyIncomePopulation }
  } = data;

  const output = {
    data,
    impact: {},
    severeImpact: {}
  };

  // CHALLENGE 1: CurrentlyInfected
  output.impact.currentlyInfected = reportedCases * 10;
  output.severeImpact.currentlyInfected = reportedCases * 50;

  // Infections By Requested Time
  output.impact.infectionsByRequestedTime = Math.trunc(
    output.impact.currentlyInfected *
      2 ** Math.trunc(convertToDays(periodType, timeToEllapse) / 3)
  );
  output.severeImpact.infectionsByRequestedTime = Math.trunc(
    output.severeImpact.currentlyInfected *
      2 ** Math.trunc(convertToDays(periodType, timeToEllapse) / 3)
  );

  // CHALLENGE 2: Severe Cases Requested By Time
  output.impact.severeCasesByRequestedTime = Math.trunc(
    0.15 * output.impact.infectionsByRequestedTime
  );
  output.severeImpact.severeCasesByRequestedTime = Math.trunc(
    0.15 * output.severeImpact.infectionsByRequestedTime
  );

  // Hospital Beds Requested By Time
  output.impact.hospitalBedsByRequestedTime =
    Math.trunc(0.35 * totalHospitalBeds) -
    output.impact.severeCasesByRequestedTime;
  output.severeImpact.hospitalBedsByRequestedTime =
    Math.trunc(0.35 * totalHospitalBeds) -
    output.severeImpact.severeCasesByRequestedTime;

  // CHALLENGE 3: CasesForICU
  output.impact.casesForICUByRequestedTime = Math.trunc(
    0.05 * output.impact.infectionsByRequestedTime
  );
  output.severeImpact.casesForICUByRequestedTime = Math.trunc(
    0.05 * output.severeImpact.infectionsByRequestedTime
  );

  // CAsesForVentilators
  output.impact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * output.impact.infectionsByRequestedTime
  );
  output.severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * output.severeImpact.infectionsByRequestedTime
  );

  // DollarsInFlight
  output.impact.dollarsInFlight = Number(
    dollars(output.impact, avgDailyIncomePopulation, avgDailyInUSD)
  );
  output.severeImpact.dollarsInFlight = Number(
    dollars(output.severeImpact, avgDailyIncomePopulation, avgDailyInUSD)
  );

  return output;
};

const dollars = (obj, avgDailyIncomePopulation, avgDailyInUSD) =>
  (
    obj.infectionsByRequestedTime *
    avgDailyIncomePopulation *
    avgDailyInUSD *
    30
  ).toFixed(2);

// output.severeImpact.infectionsByRequestedTime *
//   avgDailyIncomePopulation *
//   avgDailyInUSD *
//   30;
