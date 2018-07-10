import React from 'react';

const Linkdata = [
    { from: 12, to: 11, relationship: "extends" },
    { from: 13, to: 11, relationship: "implements" },
    { from: 14, to: 13, relationship: "extends" }
];
export default Linkdata;

/*
import React from 'react';

const API = 'http://localhost:8080/relationship';
const DEFAULT_QUERY = 'redux';

const RenderPropApproach = ({ data, isLoading, error }) =>
    <Fetcher url={API + DEFAULT_QUERY}>
        {({ data, isLoading, error }) => {
            if (!data) {
                return <p>No data yet ...</p>;
            }

            if (error) {
                return <p>{error.message}</p>;
            }

            if (isLoading) {
                return <p>Loading ...</p>;
            }

            return (
                {data}
            );
        }}
    </Fetcher>
const Linkdata = renderPropApproach;
export default Linkdata;
*/
