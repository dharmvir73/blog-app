import "./SearchBar.css";

const SearchBar = ({value, handleSearch, formSubmit}) => {
    return ( 
        <div className="searchBar-wrap">
            <form onSubmit={formSubmit}>
                <input
                type="text"
                placeholder="Search"
                value={value}
                onChange={handleSearch}
                />
                <button>GO</button>
            </form>
        </div>
     );
}
 
export default SearchBar;