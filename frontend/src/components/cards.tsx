import React from "react"
import '../assets/style.css'

type Props = {
    imgUrl: string;
    altText: string;
    imgTitle: string;
}
export default function Card(props: Props) {
    return (
        <div className="service-card">
            <img src={props.imgUrl} alt={props.altText} className="card-image" />
            <p className="card-title">{props.imgTitle}</p>
            
        </div>
    )
}