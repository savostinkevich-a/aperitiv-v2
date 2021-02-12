import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Container} from "react-bootstrap";
import {gql, useMutation, useQuery} from '@apollo/client';
import Loader from "../../Loader/Loader";

const GET_CONNECTS = gql`
    query GetConnects($limit: Int!, $page: Int!, $filters: FilterConnectsInput) {
        getConnects(limit: $limit, page: $page, filters: $filters) {
            connects {
                name
                phone
                _id
                date
            }
            total
        }
    }
`

const DELETE_CONNECT = gql`
    mutation DeleteConnect($id: String!) {
        deleteConnect(_id: $id) {
            name
        }
    }
`

const Connects = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [errors, setErrors] = useState('')
    const [deleted, setDeleted] = useState(false)

    const {loading, error, data, refetch} = useQuery(GET_CONNECTS, {variables: {limit, page, filters: {}}, fetchPolicy: 'no-cache'});

    const [deleteConnect] = useMutation(DELETE_CONNECT)

    useEffect(() => {
        refetch()
    }, [deleted])

    if (loading) {
        return <Loader/>
    }

    const deleteHandler = async (id: string) => {
        deleteConnect({
                variables: {
                    id
                }
            }
        ).then(() => {
            setDeleted(true)
        })
    }

    const connects = data.getConnects.connects.map((item: any) => {
        const date = new Date(item.date).toLocaleString()
        return (
            <Card className='mb-2'>
                <Card.Body>
                    <div>
                        {item.name}
                    </div>
                    <div>
                        {date}
                    </div>
                    <Button type={'link'} href={`tel:${item.phone}`}>{item.phone}</Button>
                    <Button onClick={() => deleteHandler(item._id)}>Удалить</Button>
                </Card.Body>
            </Card>
        )
    })
    console.log(connects)

    return (
        <Container>
            <Alert show={deleted} variant="success">
                <Alert.Heading>Удалено</Alert.Heading>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setDeleted(false)} variant="outline-success">
                        Класс!
                    </Button>
                </div>
            </Alert>
            {connects.length > 0 ? connects : "Ничего нет"}
        </Container>
    )
}

export default Connects