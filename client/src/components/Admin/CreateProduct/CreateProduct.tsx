import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form, Image } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import Loader from '../../Loader/Loader';


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
`;

const CreateProduct = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number | undefined>(undefined)

  const [previewSource, setPreviewSource] = useState<Array< string | ArrayBuffer | null >>([]);

  const [imageUrls, setImageUrls] = useState<Array<string>>([])

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [isFetching, setIsFetching] = useState(false)

  const [createProduct] = useMutation(ADD_PRODUCT, {
    onError:() => {
      setIsFetching(false)
      setError('Что-то пошло не так :(')
    }
  })

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(oldArray => [...oldArray, reader.result] );
    };
  };

  useEffect(() => {
    if (previewSource.length === imageUrls.length && imageUrls.length > 0) {
      createHandler().then(() => {})
    }
  }, [imageUrls])

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
          setIsFetching(false)
          setPreviewSource([])
          setImageUrls([])
          setPrice(undefined)
          setDescription('')
          setTitle('')
          setSuccess(`Добавлено! (${result.data.createProduct.title})`)
        }
      })
    } catch (e) {
      setIsFetching(false)
      setPreviewSource([])
      setImageUrls([])
      setPrice(undefined)
      setDescription('')
      setTitle('')
      setError(e.message)
    }
  }

  const handleFileInputChange = (e: any) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      previewFile(files[i])
    }
  };

  const uploadImage = async (base64EncodedImage: string | ArrayBuffer | null | undefined) => {
    try {
      await fetch('https://aperitiv.herokuapp.com/api/upload/products' , {
        method: 'POST',
        body: JSON.stringify({data: base64EncodedImage}),
        headers: {'Content-type' : 'application/json'}
      }).then((response) => {
        return response.json().then((data) => {
          console.log(data)
          setImageUrls(oldArray => [...oldArray, data])
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleSubmitFile = async (e: any) => {
    setIsFetching(true)
    e.preventDefault()
    if (previewSource.length === 0) return
    previewSource.forEach(i => uploadImage(i))
  }

  if (isFetching) {
    return <Loader/>
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
      <Form onSubmit={handleSubmitFile}>
        <Form.Group>
          <Form.File name='image' multiple onChange={handleFileInputChange}/>
        </Form.Group>
        {previewSource && (
          previewSource.map(image => {
            return <Image className='mt-2 mr-2 mb-3'
              //@ts-ignore
                          src={image} width={'100px'} />
          })

        )}
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
        <Button type='submit'>
          Отправить
        </Button>

      </Form>

    </Container>
  );
};

// const CreateProduct = () => {
//     const [title, setTitle] = useState('')
//     const [description, setDescription] = useState('')
//     const [price, setPrice] = useState(0)
//     const [imageUrls, setImageUrls] = useState(Array<string>())
//
//     const [progress, setProgress] = useState(0)
//

//
//     const upload = (event: any) => {
//         let files = event.target.files
//         for (let i = 0; i < files.length; i++) {
//             UploadService.uploadPortfolio(files[i], (event: any) => {
//                 setProgress(Math.round(100 * event.loaded / event.total))
//             }).then(
//                 (response) => {
//                     setImageUrls(oldArray => [...oldArray, `https://aperitiv.herokuapp.com/products/${response.data}`])
//                 }
//             )
//         }
//     }
//

//
//     return (
//         <Container>
//
//             <Form>
//                 <Form.Group>
//                     <Form.File multiple onChange={upload}/>
//                 </Form.Group>
//
//                 <Button onClick={createHandler} disabled={progress !== 100 || price === 0 || title === '' || description === ''}>Отправить</Button>
//             </Form>
//         </Container>
//     )
//
// }

export default CreateProduct;