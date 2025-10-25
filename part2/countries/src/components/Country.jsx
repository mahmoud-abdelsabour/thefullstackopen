const Country = ({result, handleShowButton, weather})=>{
    if (!result || result.length === 0) return null

    if(result.length === 1)
    {
        const country = result[0]
        return(
            <>
                <h2> {country.name.common} </h2>
                <p> Capital: {country.capital} </p>
                <p> Area: {country.area} </p>
                <h2> Languages </h2>
                <ul>
                    {Object.values(country.languages).map(lang=><li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}></img>
                {weather ? (
                <>
                    <h2>Weather in {country.capital}</h2>
                    <p>Temprature {weather.current.temp_c} Celesius </p>
                    <img src={weather.current.condition.icon} alt='weather icon' ></img>
                    <p>Wind {weather.current.wind_kph} kph </p>
                </>
                ) : null}
            </>
        )
    }else{
        return(
            <div>
                {result.map(res=> <p key={res.cca3}>{res.name.common} <button onClick={ ()=> handleShowButton(res.cca3)}>Show</button> </p>)}
            </div>
        )
    }
}
export default Country