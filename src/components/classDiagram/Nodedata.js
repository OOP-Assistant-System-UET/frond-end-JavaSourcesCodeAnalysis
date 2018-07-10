import React from 'react';

const Nodedata = [
    {key: 1,
        name: "BankAccount",
        properties: [
            { name: "owner", type: "String", visibility: "public" },
            { name: "balance", type: "Currency", visibility: "public", default: "0" }
        ],
        methods: [
            { name: "deposit", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" },
            { name: "withdraw", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" }
        ]
    },
    {
        key: 11,
        name: "Person",
        properties: [
            { name: "name", type: "String", visibility: "public" },
            { name: "birth", type: "Date", visibility: "protected" }
        ],
        methods: [
            { name: "getCurrentAge", type: "int", visibility: "public" }
        ]
    },
    {
        key: 12,
        name: "Student",
        properties: [
            { name: "classes", type: "List", visibility: "public" }
        ],
        methods: [
            { name: "attend", parameters: [{ name: "class", type: "Course" }], visibility: "private" },
            { name: "sleep", visibility: "private" }
        ]
    },
    {
        key: 13,
        name: "Professor",
        properties: [
            { name: "classes", type: "List", visibility: "public" }
        ],
        methods: [
            { name: "teach", parameters: [{ name: "class", type: "Course" }], visibility: "private" }
        ]
    },
    {
        key: 14,
        name: "Course",
        properties: [
            { name: "name", type: "String", visibility: "public" },
            { name: "description", type: "String", visibility: "public" },
            { name: "professor", type: "Professor", visibility: "public" },
            { name: "location", type: "String", visibility: "public" },
            { name: "times", type: "List", visibility: "public" },
            { name: "prerequisites", type: "List", visibility: "public" },
            { name: "students", type: "List", visibility: "public" }
        ]
    }
];
export default Nodedata;
/*
import React from 'react';

const API = 'http://localhost:8080/class';
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
const Nodedata = renderPropApproach;
export default Nodedata;*/
