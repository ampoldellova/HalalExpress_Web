import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
    width: 'auto',
    height: '400px',
    borderRadius: 15,
}

const AddAddressMapDisplay = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBb5KicFxg9zwfu05AjPuacFyT0AtwW6sE',
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {

        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const center = {
        lat: 14.509708499999999 || 0,
        lng: 121.0359409655718 || 0,
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            mapTypeId='satellite'
        >
            <Marker position={center} />
        </GoogleMap>
    ) : (
        <></>
    )
}

export default AddAddressMapDisplay