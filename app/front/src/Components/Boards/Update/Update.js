import React from "react";
import { useParams } from "react-router-dom";

export const Update = props => {
    const params = useParams();

    return (
        <div>
            { params.id }
        </div>
    );
}