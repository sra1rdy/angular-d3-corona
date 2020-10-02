 // tslint:disable-next-line: align
import { Component, ElementRef, OnInit } from '@angular/core';
import { CoronaStatusService } from '@app/services/corona-status.service';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Format from 'd3-format';
import * as d3TimeFormat from 'd3-time-format';
import { scaleTime, scaleLinear, axisLeft, axisBottom, timeFormat } from 'd3';


@Component({
  selector: 'app-de-in-new-cases',
  templateUrl: './de-in-new-cases.component.html',
  styleUrls: ['./de-in-new-cases.component.scss']
})
export class DeInNewCasesComponent implements OnInit {

  title = 'Daily New Cases (DEU)';

  germanyData = [];

  hostElement: any;
  svg: any;
  margin = {top: 20, right: 30, bottom: 20, left: 30};
  g: any;

  viewBoxWidth = 200;
  viewBoxHeight = 100;
  chartWidth: number;
  chartHeight: number;

  colorScale: any;

  xScale;
  yScale;

  xAxis;
  xAxisRef;
  yAxis;
  yAxisRef;

  scaleXData;
  scaleYData;

  constructor(
    private coronaStatusService: CoronaStatusService,
    private elRef: ElementRef
  ) {
    this.hostElement = this.elRef.nativeElement;
   }


 async ngOnInit(): Promise<void> {
    // await this.coronaStatusService.getCoronaStatus().toPromise().then((apiResponseData: any) => {
    //   const {DEU} = apiResponseData;
    //   this.germanyData = DEU.data;
    // });
    await this.coronaStatusService.getCoronaStatusLocal().toPromise().then((apiResponseData: any) => {
      const {DEU} = apiResponseData.default;
      this.germanyData = DEU.data;
    });

    this.initializeChart(this.germanyData);
}

private initializeChart(data: any): void {

  // parsing the date strings to date format
  data.forEach((d) => {
   const tParser = d3TimeFormat.timeParse('%Y-%m-%d');
   const formatDate = tParser(d.date);
   return d.date = formatDate;
  } );

  this.setChartDimensions();

  this.chartWidth = this.viewBoxWidth - this.margin.left - this.margin.right;
  this.chartHeight = this.viewBoxHeight - this.margin.top - this.margin.bottom;

  this.setColorScale();
  this.addGraphicsElement();
  this.buildXAxis();
  this.buildYAxis();
  this.buildLine();

  this.drawAxes();
  this.drawLine(data);
}

private setChartDimensions(): void {
  this.svg = d3.select(this.hostElement).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}`);
}

private addGraphicsElement(): void {
  this.g = this.svg.append('g')
      .attr('transform', 'translate(0,0)');
}

private setColorScale(): void {
  this.colorScale = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);
}


/**
 * build the elements that will be contained within our main SVG
 */

 private buildXAxis(): void {

      this.xScale = d3Scale.scaleTime()
                    .domain(d3Array.extent(this.germanyData.map((v: any) => v.date)))
                    .range([this.margin.left, this.viewBoxWidth - this.margin.right]);

      this.xAxis = d3Axis.axisBottom(this.xScale).ticks(10).tickSize(0);

      this.xAxisRef = d3Axis.axisBottom(this.xScale).ticks(12).tickSize(-80);

      this.g.append('g')
      .attr('class', 'line-chart-xaxis')
      .style('font-size', '3px')
      .attr('transform', `translate(0, ${this.viewBoxHeight - this.margin.bottom})`)
      .attr('stroke-width', 0.1);



 }

 private buildYAxis(): void {
    this.yScale = d3Scale.scaleLinear()
                         .domain([d3Array.min(this.germanyData.map((v: any) => v.new_cases)),
                          d3Array.max(this.germanyData.map((v: any) => v.new_cases))])
                          .range([this.viewBoxHeight - this.margin.bottom, this.margin.top]);

    this.yAxis = d3Axis.axisLeft(this.yScale).tickSize(0);

    this.g.append('g')
    .attr('class', 'line-chart-yaxis')
    .attr('transform', `translate(${this.margin.left}, 0)`)
    .attr('stroke-width', 0.1)
    .style('font-size', '3px');

    this.g.append('text')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top}) rotate(-90)`)
    .attr('x', 3)
    .attr('dy', '0.35em')
    .style('font-size', '2px')
    .text('new cases');
    }


private buildLine(): void {
  this.g.append('path')
    .attr('class', 'line-chart-line');
}

/**
 * draw elements of the chart based on current settings
 */
 private drawAxes(): void {
  d3.select('.line-chart-xaxis')
    .call(this.xAxis);


  d3.select('.line-chart-yaxis')
    .call(this.yAxis);
}

 private drawLine(data): void {
  const line = d3Shape.line()
    .x((d: any) => {
     const date = d.date;
     return this.xScale(date);
    })
    .y((d: any) => {
      const newCases = +d.new_cases;
      return this.yScale(newCases);
     });


  d3.select('.line-chart-line')
    .datum(data)
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 0.2);
}



}
