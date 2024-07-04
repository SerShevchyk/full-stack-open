import React from 'react';
import Header from './Header';
import StatisticLine from './StatisticLine';

const Statistics = ({results}) => {
  const resultsCount = results.good + results.neutral + results.bad;
  const average = (results.good + results.bad * -1) / resultsCount;
  const positive = results.good / resultsCount * 100 + "%";

  return (
    <>
      <Header header="Statistics"/>

      {resultsCount > 0 ? 
        <table className='statistic'>
          <tbody>
          <StatisticLine text="Good" value={results.good}/>
          <StatisticLine text="Neutral" value={results.neutral}/>
          <StatisticLine text="Bad" value={results.bad}/>
          <StatisticLine text="All" value={resultsCount}/>
          <StatisticLine text="Average" value={average}/>
          <StatisticLine text="Positive" value={positive}/>
          </tbody>
        </table>
        : "No feedback given"
      }


    </>
  );
};

export default Statistics;