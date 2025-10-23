const Country = ({result})=>{
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
            </>
        )
    }else{
        return(
            <div>
                {result.map(res=> <p key={res.cca3}>{res.name.common}</p>)}
            </div>
        )
    }
}
export default Country