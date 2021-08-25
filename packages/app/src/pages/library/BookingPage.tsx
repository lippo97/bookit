import { Container, CircularProgress } from '@material-ui/core'
import { Room } from '../../components/picker/types';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import PickerForm from '../../components/picker/PickerForm';
import { room } from '../../components/editor/fakeData';
import { useEffect, useState } from 'react';

type BookingPageParams = {
    roomId: string;
}

async function fetchRoom(id: string): Promise<Room> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(room);
        }, 2000)
    })
}

function BookingPage() {
    const { roomId } = useParams<BookingPageParams>();
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchRoom(roomId).then(res => {
            setRoom(res);
            setLoading(false);
        });
    }, [roomId]);

    function renderForm() {
        if (loading) {
            return (
                <PickerForm
                    loading={loading}
                />
            )
        }
        if (room !== null) {
            return (
                <PickerForm
                    room={room}
                />
            )
        }
        return (
            <p>{"Couldn't retrieve informations."}</p>
        )
    }

    return (
        <Layout title="Book a seat">
            <Container>
                {renderForm()}
            </Container>
        </Layout>
    )
}

export default BookingPage;
