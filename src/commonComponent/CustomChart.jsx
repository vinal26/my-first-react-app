import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { parseISO } from 'date-fns/esm';
import { format, getDaysInMonth } from 'date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
  );

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display : false
        },
        title: {
            display: false,
            text: 'Current Reading',
        },
    },
    scales: {
        // xAxes: [{
        //     barThickness: 6,  // number (pixels) or 'flex'
        //     maxBarThickness: 8 // number (pixels)
        // }],
        xAxis: {
            grid: {
                lineWidth: 0,
                display: false,
            }
        },
        yAxes: {
            min: 0,
            max: 200
        },
    },
    barThickness: 5,
    borderRadius: 15,
    minBarLength: 5,
    // aspectRatio: 1,
   
    maintainAspectRatio: false
};


export function CustomChart({ lables, data }) {
    return <div style={{
        height: "240px",
        paddingRight: 0
    }}>
     <Bar options={options} data={data} />
    </div>
}

export const data = (labels, points) => { return {
    labels: [...labels],
    datasets: [
      {
        label: '# of Votes',
        data: [...points],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        borderWidth: 0,
      },
    ],
  }
}

  const doughOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: "right",
            labels: {
                usePointStyle: true,
                pointStyle: "circle"
            }
        },
    },
  };

export function CustomDoughnut({ labels, points }) {
    return <div style={{
        // height: "240px",
        paddingRight: 0,
        padding: '10px'
    }}>
     <Doughnut data={data(labels, points)} options={doughOptions} />
    </div>
}

export const dataLine = (val, name) => {
    if(name==='bloodBP')
        return {
            labels: Object.keys(val).map((key) => key),
            datasets: [
                {
                    label: 'Systolic',
                    data: Object.keys(val).map((key) => isNaN(val[key]) ? val[key]?.split('/')[0] : val[key]),
                    tension: 0.3,
                    // pointRadius: 0,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label: 'Diastolic',
                    data: Object.keys(val).map((key) => isNaN(val[key]) ? val[key]?.split('/')[1] : val[key]),
                    tension: 0.3,
                    // pointRadius: 0,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                },
            ]
        }
    
    return {
        labels: Object.keys(val).map((key) => key),
        datasets: [
            {
                label: name,
                data: Object.keys(val).map((key) => val[key]),
                tension: 0.3,
                // pointRadius: 0,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
        ]
    }
};

export function CustomLine({data, name, duration}) {
    const [Val, setVal] = useState({})

    const updateGraphData = () => {
        console.log(data);

        if(duration=="week") {
            setVal({"Sun":0, "Mon":0, "Tue":0, "Wed":0, "Thu":0, "Fri":0, "Sat":0})
            data.map(d => setVal(prev => { return {...prev,[format(parseISO(d.createdAt), 'EEE')]: d[name]}}))
            // console.log("week: ", Val);
        }
        else if(duration=="month"){
            let daysInMonth = getDaysInMonth(new Date()), res = {};
            for(let i=1;i<=daysInMonth;i++) {
                res[i+'']=0;
            }
            setVal(res)
            data.map(d => setVal(prev => { return {...prev,[format(parseISO(d.createdAt), 'd')]: d[name]}}))
            // console.log("month: ", Val);
        }
    }
    
    useEffect(() => {
        setVal({})
        updateGraphData()
    },[data])

    return (
        <div style={{
            height: "240px",
            // width: "100%",
            // paddingRight: 0,
            padding: "10px 0"
        }}>
            <Line options={options} data={dataLine(Val, name)} />
        </div>
    );
}