import React, {useState} from "react";
import {Alert, Button, Container, Form} from "react-bootstrap";
import UploadService from "../../../services/upload-files.service";
import {gql, useMutation} from '@apollo/client';


const ADD_PRODUCT = gql`
    mutation CreateProduct($title: String!, $price: Float!, $description: String!, $imageUrls: [String!]!) {
        createProduct(createProductData: {
            title: $title,
            description: $description,
            price: $price,
            imageUrls: $imageUrls
        }) {
            title
        }
    }
`

const CreateProduct = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrls, setImageUrls] = useState(Array<string>())

    const [progress, setProgress] = useState(0)

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const [createProduct] = useMutation(ADD_PRODUCT, {
        onError:() => {
            setError('Такое название уже есть, нужно другое')
        }
    })

    const upload = (event: any) => {
        let files = event.target.files

        for (let i = 0; i < files.length; i++) {
            UploadService.uploadPortfolio(files[i], (event: any) => {
                setProgress(Math.round(100 * event.loaded / event.total))
            }).then(
                (response) => {
                    setImageUrls(oldArray => [...oldArray, `https://aperitiv.herokuapp.com/products/${response.data}`])
                }
            )
        }
    }

    const createHandler = async () => {
        try {
            createProduct({
                variables: {
                    title,
                    price,
                    description,
                    imageUrls
                }
            }).then(result => {
                if (result && result.data) {
                    setSuccess(`Добавлено! (${result.data.createProduct.title})`)
                    setImageUrls([])
                    setPrice(0)
                    setDescription('')
                    setTitle('')
                }
            })
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <Container>
            <Alert show={success !== ''} variant="success">
                <Alert.Heading>{success}</Alert.Heading>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setSuccess('')} variant="outline-success">
                        Класс!
                    </Button>
                </div>
            </Alert>
            <Alert show={error !== ''} variant="danger">
                <Alert.Heading>{error}</Alert.Heading>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setError('')} variant="outline-danger">
                        Понятно
                    </Button>
                </div>
            </Alert>
            <Form>
                <Form.Group>
                    <Form.File multiple onChange={upload}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Название"
                                  value={title} onChange={event => setTitle(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Описание"
                                  as="textarea" rows={3}
                                  value={description} onChange={event => setDescription(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="number" placeholder="Стоимость"
                                  value={price} onChange={event => setPrice(parseFloat(event.target.value))}
                    />
                </Form.Group>
                <Button onClick={createHandler} disabled={progress !== 100 || price === 0 || title === '' || description === ''}>Отправить</Button>
            </Form>
        </Container>
    )

}

export default CreateProduct