const Filter = ({SearchTerm, handleSearchTermChange}) => {
    return( 
        <div>
            Search: <input value={SearchTerm} onChange={handleSearchTermChange} />
        </div>
    )
}
export default Filter