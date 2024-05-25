'use client';

import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis } from 'recharts';
import { maxSorted, mean, minSorted, quantile, standardDeviation } from 'simple-statistics';

import { GetScoreByAssignmentResponse } from '@/types/schema/score-schema';

type ScatterProps = {
  data: GetScoreByAssignmentResponse;
};

const ScatterChartCustom: React.FC<ScatterProps> = ({ data }) => {
  const scores = data.scores
    .map((score) => {
      return score.score;
    })
    .sort((a, b) => a - b);

  const maxScore = maxSorted(scores);
  const minScore = minSorted(scores);
  const stdScore = Math.round(standardDeviation(scores) * 100) / 100;
  const meanScore = Math.round(mean(scores) * 100) / 100;
  const firstQuartileScore = quantile(scores, 0.25);
  const secondQuartileScore = quantile(scores, 0.5);
  const thirdQuartileScore = quantile(scores, 0.75);
  const count = data.submittedAmount;

  const graphData = scores.map((score, i) => {
    return { index: i + 1, score: score };
  });

  const xTicks = [];
  for (let i = 0; i <= count + 5; i += 10) {
    xTicks.push(i);
  }

  const yTicks = [];
  for (let i = 0; i <= maxScore + 5; i += 10) {
    yTicks.push(i);
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart width={730} height={250}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" type="number" name="students" domain={[0, count]} ticks={xTicks} />
          <YAxis dataKey="score" type="number" name="score" domain={[0, maxScore]} ticks={yTicks} />
          {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
          {/* <Legend /> */}
          <Scatter data={graphData} fill="#adfa1d" />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-4 grid-rows-2 justify-items-center gap-y-1">
        <div>Count: {count}</div>
        <div>Mean: {meanScore}</div>
        <div>STD: {stdScore}</div>
        <div>Min: {minScore}</div>
        <div>25%: {firstQuartileScore}</div>
        <div>50%: {secondQuartileScore}</div>
        <div>75%: {thirdQuartileScore}</div>
        <div>Max: {maxScore}</div>
      </div>
    </div>
  );
};

export default ScatterChartCustom;
