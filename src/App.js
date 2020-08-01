import React from 'react';
import {Cards,Charts,CountryPicker} from './components';
import styles from './App.module.css';
import {fetchData} from './api';
import coronaImage from './images/image.png'; 
import creditImage from './images/credits.png';
class App extends React.Component{
    state={
        data:{},
        country:'',
    }
    async componentDidMount(){
        const fetchedData= await fetchData();
        
        this.setState({data:fetchedData});
    }
    handleCountryChange=async(country)=>{
        const fetchedData=await fetchData(country);
        this.setState({data:fetchedData , country:country});

    }
    render(){
        const {data,country}=this.state;
        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt='corona' />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts data={data} country={country} />
                <img className={styles.image2} src={creditImage} alt='corona' />
                
            </div>
        );
    }
}
export default App;
