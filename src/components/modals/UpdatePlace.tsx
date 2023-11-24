import { ChangeEvent, useState, useEffect } from 'react'
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Button, Label, Modal, TextInput } from 'flowbite-react'
import axios from '../../api/api'
import { getData } from '../../features/place/placeSlice';
import { Place } from '../../types/types';

interface Props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    place: Place
}

const UpdatePlace = ({ setOpenModal, place: data }: Props) => {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    const [place, setPlace] = useState(data);

    useEffect(() => {
        console.log(place)
    }, [])


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPlace({
            ...place,
            [e.target.name]: e.target.value
        })
    }

    const updatePlace = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            console.log(place)
            await axios.put(`/place/${place._id}`, place)
            dispatch(getData())
            setOpenModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Modal.Header>Update Place</Modal.Header>
            <Modal.Body>
                <form className="flex max-w-md flex-col gap-4" onSubmit={updatePlace}>
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
                        <TextInput value={place?.address?.lat} type="text" required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Longitud" />
                        </div>
                        <TextInput value={place?.address?.lng} type="text" required shadow />
                    </div>
                    <Button type="submit">Update</Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </>
    )
}

export default UpdatePlace