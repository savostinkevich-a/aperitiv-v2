import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import Loader from '../../Loader/Loader';

const GET_PRODUCT_ID = gql`
    query GetProduct($prettyId: String!) {
        getProductByPrettyId(prettyId: $prettyId) {
            _id
            imageUrls
        }
    }

`;

const DELETE_PRODUCT = gql`
    mutation DeleteProduct($_id: String!) {
        deleteProduct(_id: $_id) {
            title
        }
    }
`;

const UpdateProduct = () => {
  const [link, setLink] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const deleteImages = async (imageUrl: string) => {
    const array = imageUrl.split('/')
    const publicId = `${array[array.length - 2]}/${array[array.length - 1]}`
    console.log(publicId.split('.')[0])
    try {
      await fetch('https://aperitiv.herokuapp.com/api/upload/products', {
        method: "DELETE",
        body: JSON.stringify({data: publicId.split('.')[0]}),
        headers: {'Content-type' : 'application/json'}
      }).then((response) => {
        return response.json().then((data) => {
          console.log(data)
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  const [getProduct, { loading }] = useLazyQuery(GET_PRODUCT_ID, {
    onCompleted:((data) => {
      console.log(data)

      data.getProductByPrettyId.imageUrls.forEach((imageUrl: string) => deleteImages(imageUrl))

      deleteProduct({variables : {_id: data.getProductByPrettyId._id}}).then(
        (data) => {
          console.log(data)
          setLink('')
          setTitle(data.data.deleteProduct.title)
        }
      )
    })
  });


  if (loading) {
    return <Loader />;
  }

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (link !== '' && link) {
      const array = link.split('/');
      const prettyId = array[array.length - 1];
      getProduct({ variables: { prettyId } });
    }
  };


  return (
    <Container>
      <Alert variant='success' show={title !== ''}>
        <Alert.Heading>Удалено ({title})</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setTitle('')} variant="outline-success">
            Класс!
          </Button>
        </div>
      </Alert>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Control type="text" placeholder="Название"
                        value={link}
                        onChange={event => {
                          setLink(event.target.value);
                        }}
          />
        </Form.Group>
        <Button type='submit'>Удалить</Button>
      </Form>
    </Container>
  );
};

export default UpdateProduct;