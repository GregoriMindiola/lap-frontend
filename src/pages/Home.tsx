import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  useLoadScript,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { Button, Modal } from 'flowbite-react';
import CreatePlace from "../components/modals/CreatePlace";
import { getData, selectLocation } from "../features/place/placeSlice";
import { RootState } from '../store/store';
import { Place } from '../types/types';
import { ThunkDispatch } from '@reduxjs/toolkit';
import UpdatePlace from '../components/modals/UpdatePlace';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { places } = useSelector((state: RootState) => state.place)
  const [currentMarked, setCurrentMarked] = useState();
  const navigate = useNavigate()


  const apiKey = 'AIzaSyBAsFa18dgUzJUYY2CdYXDTi4PfUIFeqqo';

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  })

  const mapContainerStyle = {
    width: '80vw',
    height: '80vh'
  }

  const center = {
    lat: -3.749656,
    lng: -38.523407
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    dispatch(getData())
  }, [])

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  return (
    <div>
      <h3 className="text-center">Map</h3>
      <Button onClick={logout}>Cerrar sesión</Button>
      {
        isLoaded ? (
          <>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={4}
              onClick={(event: google.maps.MapMouseEvent) => {
                console.log(event.latLng?.lat(), event.latLng?.lng())
                const lat = event.latLng?.lat() || 0
                const lng = event.latLng?.lng() || 0
                setOpenModal(true)
                dispatch(selectLocation({ lat, lng }))
              }}
            >
              {
                places.map((place: Place) => (
                  <Marker
                    key={place._id}
                    position={{ lat: place.address?.lat || 0, lng: place.address?.lng || 0 }}
                    onClick={(e) => {
                      setCurrentMarked(place)
                      setOpenModalUpdate(true)
                    }}
                  />
                ))
              }
            </GoogleMap>
          </>
        ) : (
          <></>
        )
      }
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <CreatePlace setOpenModal={setOpenModal} />
      </Modal>
      <Modal dismissible show={openModalUpdate} onClose={() => setOpenModalUpdate(false)}>
        <UpdatePlace place={currentMarked} setOpenModal={setOpenModalUpdate} />
      </Modal>
    </div>
  )
}

export default Home