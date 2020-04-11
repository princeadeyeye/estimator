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
    population
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
  const percentageAffected = (reportedCases / population) * 100;
  // const totalMoney = population * avgDailyIncomePopulation;
  const dailyIncomeInfected1 = percentageAffected * population;
  // const dailyIncomeInfected2 = currentlyInfected * avgDailyIncomeInUSD;
  dollarsInFlight = Math.trunc(infectionsByRequestedTime * percentageAffected
    * dailyIncomeInfected1 * 30);
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
    population
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
  const percentageAffected = (reportedCases / population) * 100;
  // const totalMoney = population * avgDailyIncomePopulation;
  const dailyIncomeInfected1 = percentageAffected * population;
  // const dailyIncomeInfected2 = currentlyInfected * avgDailyIncomeInUSD;
  dollarsInFlight = Math.trunc(infectionsByRequestedTime
    * percentageAffected * dailyIncomeInfected1 * 30);
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

const getInput = () => {
  const population = document.querySelector('input[data-population]').value;
  const timeToElapse = document.querySelector('input[data-time-to-elapse]').value;
  const reportedCases = document.querySelector('input[data-reported-cases]').value;
  const totalHospitalBeds = document.querySelector('input[data-total-hospital-beds]').value;
  const periodType = document.querySelector('.wrap-input100[data-period-type]').value;
  const data = {
    population, timeToElapse, reportedCases, totalHospitalBeds, periodType
  };
  return data;
};
const sendInputData = () => {
  const data = getInput();
  covid19ImpactEstimator(data);
};

window.onload = () => {
  const button = document.querySelector('button[data-go-estimate]');
  button.addEventListener('click', (event) => {
    event.preventDefault();
    sendInputData();
  });
};

// export default covid19ImpactEstimator;
