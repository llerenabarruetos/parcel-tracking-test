import React, {useEffect, useState} from "react";
import './TrackingPage.css';

// GET request to API endpoint:
async function getTrackingData() {
    return fetch("http://localhost:8080/exampleparcel",).then((res)=>res.json());
}

// Tracking Checkpoint Component:
function Checkpoint(props) {
    return(
        <div className={`checkpointContainer ${props.current ? "currentCheckpoint" : ""}`}>
            <div className="checkpointCol">
                <h3>{ props.date }</h3>
                <p>{ props.time }</p>
            </div>
            <div className="checkpointCol">
                <h2>{ props.status }</h2>
                <p className="checkpointLocation">{ props.location }</p>
                {
                    /* 
                        If status is "Awaiting payment", include a link to pay taxes to the corresponding country.
                        Ideally, the application would have a hash table with the links for each country code. The link for the corresponding country's tax website would be included here.
                        But in this case, we include Brazil's link manually.
                    */
                    props.status === "Awaiting payment" && 
                        <a href="https://apps.correios.com.br/cas/login?service=https%3A%2F%2Fapps.correios.com.br%2Fportalimportador%2Fpages%2FpesquisarRemessaImportador%2FpesquisarRemessaImportador.jsf"
                            target="_blank"
                        >
                            <button style={{backgroundColor: "blue", margin: "0.75em 0 0.75em", width: "100%"}}>
                                Go to Pay Taxes
                            </button>
                        </a>
                }
            </div>
        </div>
    );
}

export default function TrackingPage() {
    // API response state variable:
    const [apiResponse, setApiResponse] = useState({}); // initialize to empty object {}

    // GET data as soon as page loads:
    useEffect(() => {
        getTrackingData().then((data) => {
            setApiResponse(data);
        })
    }, [])

    return(
        <div className="trackingContainer">
            <div className="trackingHeader">
                <button onClick={() => {navigator.clipboard.writeText( apiResponse?.label?.tracking_number )}}
                    title={apiResponse?.label?.tracking_number + " (click to copy)"}>
                    Tracking Number
                </button>
                <button onClick={() => {navigator.clipboard.writeText( apiResponse?.label?.external_tracking_number )}}
                    title={apiResponse?.label?.external_tracking_number + " (click to copy)"}>
                    External Tracking Number
                </button>
            </div>

            {
                // Iterate through tracking items:
                apiResponse?.parcel_tracking_items?.map((item, index) => {
                    const timestamp = new Date(item.timestamp);
                    
                    // status can be found in 2 places:
                    let status = item.tracking_code?.tracking_code_locales[0]?.description;
                    if (status === undefined) // if it wasn't in first place, try second place
                        status = item.tracking_code_vendor?.tracking_code?.tracking_code_locales[0].description;

                    let locationPrefix = (item.location != null) ? `${item.location}, ` : "";
                    let locationSuffix = item.state + ", " + item.city + ", " + item.country.isoCode;

                    // In one tracking item (#7), the state, city, and isoCode attributes are null.
                    // Default to "FL, Doral, US" for unknown state/city/isoCode if country is US:
                    if (item.city === null && item.country?.id === 236)
                        locationSuffix = "FL, Doral, US";

                    return(
                        <Checkpoint 
                            key = {index}
                            location={locationPrefix + locationSuffix} 
                            status={status} 
                            current={(index === 0)} 
                            date={timestamp.toLocaleString(navigator.language, {month: 'short', day: 'numeric', year: 'numeric'})}
                            time={timestamp.toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit"})}
                        />
                    )
                })
            }
        </div>
    );
}