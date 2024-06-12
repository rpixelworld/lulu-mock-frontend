export const fetchFilters = () => dispatch =>{
    fetch('http://api-lulu.hibitbyte.com/product/filter?mykey=Dqhr38t/EStgqM/rjjutXO1B3CgwtquL0Jk8XVP7G4vInpTIMZwF01zwJ906Y27ijkbmQT3sCz3bJ/63p3otAA==')
        .then(res => res.json())
        .then(res => {
            const filters = res.rs;
            dispatch({
                type: 'FETCH_FILTERS',
                payload: filters
            })
        })
        .catch(error => {
            console.error('API Request Failed:', error);
        });
}
