const Form = ({ nameInput, setName }) => {

    const fetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return(
        <form onSubmit={fetch}>
            <input {...nameInput} />
            <button type='submit' >find</button>
        </form>
    )

}

export default Form