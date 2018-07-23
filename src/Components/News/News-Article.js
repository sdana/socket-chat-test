import React from "react"
import Moment from 'react-moment';


export default props => {
    return (
        <div className={props.styling} style={{ width: `18rem` }}>
            <div className="card-body">
                <h5 className="card-title">
                    {props.article.title}
                </h5>
                <p className="card-body">{props.article.synopsis}</p>
                <p className="card-body">{props.article.url}</p>
                <p className="card-body"><Moment>{props.article.timestamp}</Moment></p>

                <a href="#" onClick={() => props.checkOutarticle(props.article.id)}>Delete</a>
            </div>
        </div>
    )
}
