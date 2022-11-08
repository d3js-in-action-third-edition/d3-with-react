import { Fragment } from 'react';
import * as d3 from 'd3';
import ChartContainer from '../ChartComponents/ChartContainer';
import Circle from '../ChartComponents/Circle';
import Axis from '../ChartComponents/Axis';

const Scatterplot = props => {
  const width = 500;
  const height = 350;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(props.data, d => d.user_count)])
    .range([0, innerWidth])
    .nice();
  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([innerHeight, 0]);

  return (
    <Fragment>
      <h2>Retention vs Usage</h2>
      <ChartContainer
        width={width}
        height={height}
        margin={props.margin}
      >
        <Axis 
          type="bottom"
          scale={xScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          label={"User Count"}
        />
        <Axis 
          type="left"
          scale={yScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          label={"Retention %"}
        />
        {props.data.map(datum => (
          <Circle 
            key={`circle-${datum.id}`}
            cx={xScale(datum.user_count)}
            cy={yScale(datum.retention_percentage)}
            r={6}
            fill={props.colorScale(datum.id)}
          />
        ))}
      </ChartContainer>
    </Fragment>
  )
};

export default Scatterplot;