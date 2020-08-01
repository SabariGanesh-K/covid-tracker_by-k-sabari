import React,{useState,useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line,Bar} from 'react-chartjs-2';
import styles from './Charts.module.css';
const Charts=({data:{confirmed,deaths,recovered},country}) => {
    const[dailyData,setDailyData]=useState([]);
    useEffect(()=>{
        const fetchAPI=async () => {
            setDailyData(await fetchDailyData());
        }
        
        fetchAPI();
    });
    const lineChart=(
        dailyData.length 
            ? (
                <Line 
                data={{
                    labels:dailyData.map(({date})=> date),
                    datasets:[{
                    data:dailyData.map(({confirmed})=>confirmed),
                    label:'INFECTED',
                    borderColor:'rgba(95, 34, 6)',
                    backgroundColor:'rgba(95,34,6,0.5)', //#3333ff
                    fill:true,
                },{
                    
                    data:dailyData.map(({deaths})=>deaths),
                    label:'DEATHS',
                    borderColor:'red',
                    backgroundColor:'rgba(255,0,0,0.5)',
                    fill:true,
                }],
            }}
            />) : null
    );
    const barGraph=(
        confirmed ? (
            <Bar
            data={{
                labels:['INFECTED','RECOVERED','DEATHS'],
                datasets:[{
                    label:'people',
                    backgroundColor:[
                        'rgba(95, 34, 6)',
                        
                        'rgba(0,255,0)',
                        'rgba(255,0,0)',
                    ],
                    data:[confirmed.value,recovered.value,deaths.value]
                }]
            }}
            options={{
                legend:{display:false},
                title:{display:false,text:'Current State in $(country)'},
            }}
            />) : null
    );
    return(
        <div className={styles.container}>
            {country ? barGraph : lineChart}
        </div>
    )
}
export default Charts;