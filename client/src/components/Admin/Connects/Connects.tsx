import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Modal } from 'react-bootstrap';
import { gql, useMutation, useQuery } from '@apollo/client';
import Loader from '../../Loader/Loader';
import { NavLink } from 'react-router-dom';

const GET_CONNECTS = gql`
    query GetConnects($limit: Int!, $page: Int!, $filters: FilterConnectsInput) {
        getConnects(limit: $limit, page: $page, filters: $filters) {
            connects {
                name
                date
                phone
                _id
                desires
                desiresText
            }
            total
        }
    }
`;

const DELETE_CONNECT = gql`
    mutation DeleteConnect($id: String!) {
        deleteConnect(_id: $id) {
            name
        }
    }
`;

const Connects = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [errors, setErrors] = useState('');
  const [deleted, setDeleted] = useState(false);

  const [deletingItemId, setDeletingItemId] = useState('');

  const [modal, setModal] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_CONNECTS, {
    variables: { limit, page, filters: {} },
    fetchPolicy: 'no-cache',
  });
  console.log(data, error);
  const [deleteConnect] = useMutation(DELETE_CONNECT);

  useEffect(() => {
    refetch();
  }, [deleted]);

  if (loading) {
    return <Loader />;
  }

  const deleteHandler = async (id: string) => {
    deleteConnect({
        variables: {
          id,
        },
      },
    ).then(() => {
      setDeleted(true);
    });
  };

  const connects = data.getConnects.connects.map((item: any) => {
    const date = new Date(item.date).toLocaleString();
    return (
      <Card className='mb-4'>
        <Card.Header className='d-flex'>
          <div className='pb-1 font-weight-bold' style={{ fontSize: 20 }}>
            {item.name}
          </div>

            <Button className='ml-auto' onClick={() => {
              setModal(true);
              setDeletingItemId(item._id);
            }} variant={'danger'}>Удалить</Button>
        </Card.Header>
        <Card.Body>
          <div className='pb-1' style={{ fontSize: 16 }}>
            {item.desiresText}
          </div>
          {
            item.desires.map((link: string) => {
              return  <a href={link}> <img src={link} width={'200px'} className='mr-3 mb-3'/> </a>
            })
          }
          <div>
            <Button type={'link'} href={`tel:${item.phone}`}>{item.phone}</Button>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className='pb-1' style={{ fontSize: 14 }}>
            {date}
          </div>
        </Card.Footer>
      </Card>
    );
  });
  console.log(data);

  return (
    <Container>
      <Modal show={modal}
             backdrop={() => setModal(false)}
      >
        <div className='justify-content-center d-flex mb-5 mt-5'>Точно удалить?</div>
        <div className='justify-content-center d-flex mb-5'>
          <Button variant={'danger'} className='mr-5' onClick={() => {
            deleteHandler(deletingItemId).then(() => {
              setDeletingItemId('');
              setModal(false);
            });
          }}>Удалить</Button>
          <Button onClick={() => setModal(false)}>Отмена</Button>
        </div>
      </Modal>
      <Alert show={deleted} variant="success">
        <Alert.Heading>Удалено</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setDeleted(false)} variant="outline-success">
            Класс!
          </Button>
        </div>
      </Alert>
      {connects.length > 0 ? connects : 'Ничего нет'}
    </Container>
  );
};

export default Connects;