import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Label, Modal, TextInput } from 'flowbite-react'
import axios from '../../api/api'
import { RootState } from '../../store/store'
import { getData } from '../../features/place/placeSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'

interface Props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreatePlace = ({ setOpenModal }: Props) => {

    const { currentAddress }: any = useSelector((state: RootState) => state.place)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const [place, setPlace] = useState({
        name: '',
        type: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPlace({
            ...place,
            [e.target.name]: e.target.value
        })
    }

    const createPlace = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            console.log(place)
            await axios.post('/place', place)
            dispatch(getData())
            setOpenModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setPlace({
            ...place,
            address: {
                lat: currentAddress.lat,
                lng: currentAddress.lng
            }
        })
    }, [])

    return (
        <>
            <Modal.Header>Create Place</Modal.Header>
            <Modal.Body>
                <form className="flex max-w-md flex-col gap-4" onSubmit={createPlace}>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Name" />
                        </div>
                        <TextInput
                            value={place.name}
                            onChange={handleInputChange}
                            type="text"
                            name='name'
                            placeholder="Name..."
                            required
                            shadow
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Type" />
                        </div>
                        <TextInput
                            value={place.type}
                            onChange={handleInputChange}
                            type="text"
                            name='type'
                            placeholder="Type..."
                            required
                            shadow
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Latitud" />
                        </div>
                        <TextInput value={place?.address?.lat} type="text" required shadow disabled />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Longitud" />
                        </div>
                        <TextInput value={place?.address?.lng} type="text" required shadow disabled />
                    </div>
                    <Button type="submit">Create</Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </>
    );
}


export default CreatePlace