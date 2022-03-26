import React, { useEffect, useState } from 'react';

const Auth = function() {
    let [count, setCount] = useState(0);
    
    useEffect(() => {
        console.log(count);

        return function cleanup() {
            console.log(count);
        }
    });

    return (
        <div>
            <button onClick={() => {setCount(count + 1)}} >
                Count - {count}
            </button>
        </div>
    );
}

export default Auth;