'use client';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import React, { useEffect, useRef } from 'react';
import { Chart, ChartData } from 'chart.js/auto';

const Page = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext('2d');
      const newChart = new Chart(context, {
        type: 'bar',
        data: {
          labels: [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
          ],

          datasets: [
            {
              label: 'April Total spend 1',
              data: [
                100, 20, 70, 120, 50, 60, 130, 180, 160, 180, 100, 120, 150,
                140, 150, 160, 170, 180, 160, 100,
              ],
              backgroundColor: '#B0B7C0',
            },
            {
              label: 'April Total spend 2',
              data: [
                50, 130, 30, 50, 150, 160, 70, 50, 90, 90, 180, 80, 130, 60,
                150, 180, 170, 280, 190, 200,
              ],
              backgroundColor: '#B0B7C0',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'April Total spend',
            },
          },
        },
      });
      chartRef.current.chart = newChart; 
    }
  }, []);
  return (
    <div className=" grid grid-cols-1  ">
      <div className=" container grid grid-cols-1 sm:grid-cols-3  py-2 ">
        <span className=" float-start font-bold my-2  sm:text-lg mx-2">
          {' '}
          Total spent
        </span>
        <span className=" mx-1 my-2  float-start font-bold text-lg text-gray-400">
          Upcoming spend
        </span>
        <button className=" border  sm:text-sm font-bold px-2 py-2  mx-1 rounded-[30px]  float-end">
          {' '}
          + Add Finance Integration
        </button>
      </div>
      <div className="container float-start grid  grid-cols-1 sm:grid-cols-3  w-full  my-5  sm:w-[50%] ">
        <div className=" my-5 mx-3">
          <Select>
            <SelectTrigger className="w-[180px] mx-5">
              <SelectValue placeholder="Skills" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>BreakDown</SelectLabel>
                <SelectItem value="contractors">Contractors</SelectItem>
                <SelectItem value="skills">skills</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className=" my-5 mx-3">
          <Select>
            <SelectTrigger className="w-[180px] mx-5">
              <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Date Range</SelectLabel>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="lastYear">Last Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className=" my-5 mx-3">
          <Select>
            <SelectTrigger className="w-[180px] mx-5 ">
              <SelectValue placeholder="Daily" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Interval</SelectLabel>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="border container my-5  sm:w-[80%]">
        <canvas ref={chartRef} />
      </div>
      <div className=" container grid sm:grid-cols-3   grid-cols-1">
        <div className=" border mx-1 ">
          <p className=" p-2 mx-2 font-bold">Active Jobs</p>
          <p className="p-2 mx-2">0</p>
          <p className=" p-2 mx-2 text-gray-300">24 total jobs to date</p>
        </div>
        <div className=" border mx-1 ">
          <p className=" p-2 mx-2  font-bold">Active Jobs</p>
          <p className="p-2 mx-2">0</p>
          <p className=" p-2 mx-2 text-gray-300">24 total jobs to date</p>
        </div>
        <div className=" border mx-1 ">
          <p className="p-2 mx-2 font-bold">Active Jobs</p>
          <p className="p-2 mx-2">0</p>
          <p className="p-2 mx-2 text-gray-300">24 total jobs to date</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
