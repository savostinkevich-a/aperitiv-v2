import React, { useEffect, useState } from 'react';
import {Button, Form, InputGroup, Modal, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {setModalOpen} from "../../redux/connects/actions";
import {GrClose} from 'react-icons/gr'
import s from './Modal.module.scss'
import {gql, useMutation} from "@apollo/client";
import {FiPaperclip} from 'react-icons/fi'
import UploadService from "../../services/upload-files.service";

type PropsType = {
    isOpen: boolean
    setModalOpen(isOpen: boolean): void
}

const ADD_CONNECT = gql`
    mutation AddConnect($name: String!, $phone: String!, $desires: [String!]!, $desiresText: String!) {
        createConnect(createConnectData: {
            name: $name,
            phone: $phone,
            desires: $desires,
            desiresText: $desiresText
        }) {
            name
        }
    }
`

const ModalForm = (props: PropsType) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [desire, setDesire] = useState('')
    const [imageUrls, setImageUrls] = useState(Array<string>())
    const [check, setCheck] = useState(false)

    const [error, setError] = useState('')

    const [addConnect] = useMutation(ADD_CONNECT, {
        onError: () => {
            setError('Что-то пошло не так')
        }
    })

    const upload = (event: any) => {
        let files = event.target.files

        for (let i = 0; i < files.length; i++) {
            UploadService.uploadClient(files[i])
                .then((response) => {
                    setImageUrls(oldArray => [...oldArray, `http://localhost:5000/client/${response.data}`])
                })
        }
    }

    const deleteImages = () => {
        imageUrls.forEach(item => {
            const array = item.split('/')
            const name = array[array.length - 1]
            let i = 0
            UploadService.deleteClient(name).then(() => i++)
        })
        setImageUrls([])
    }


    const inputRef = React.useRef<HTMLInputElement>(null)
    return (
        <Modal
            show={props.isOpen}
            onHide={() => props.setModalOpen(false)}
            backdrop="static"
            keyboard={false}
            contentClassName={s.modalWrapper}
            className={s.modal}
        >
            <Row className={s.closeButtonRow}>
                <GrClose className={s.closeButton} onClick={() => props.setModalOpen(false)}/>
            </Row>
            <Modal.Body className={s.modalContainer}>
                <Row className={s.titleRow}>Заполните форму</Row>
                <Form>
                    <Form.Control className={s.inputItem} type="name" placeholder="Имя"
                                  value={name} onChange={event => setName(event.target.value)}
                    />
                    <Form.Control className={s.inputItem} type="phone" placeholder="Телефон"
                                  value={phone} onChange={event => setPhone(event.target.value)}
                    />
                    <Form.Group className={s.desiresContainer}>
                        <Form.Control className={s.desiresInput} type="text" placeholder="Ваши пожелания"
                                      value={desire} onChange={event => setDesire(event.target.value)}
                        />
                        <Form.File multiple onChange={upload} ref={inputRef} className={s.invisibleFileInput}/>
                        <Button
                            className={s.fileInputButton}
                            onClick={() => {
                                // @ts-ignore
                            inputRef.current.click()
                        }}><FiPaperclip/></Button>
                    </Form.Group>
                    {imageUrls.length > 0 &&
                    <div className={s.imageContainer}>
                        {imageUrls.length > 0 && imageUrls.map(item => <img src={item} width={'50px'}/>)}
                        <Button onClick={deleteImages}>Убрать все</Button>
                    </div>

                    }
                    <div className={s.checkboxContainer}>
                        <span className={s.checkboxText}>Я принимаю условия </span>
                        <a className={s.checkboxText}>политики конфеденциальности </a>
                        <label className={s.checkbox}>
                            <input type="checkbox" checked={check} onChange={() => setCheck(!check)}/>
                            <span className={s.default}></span>
                        </label>
                    </div>
                    <div className={s.buttonContainer}>
                        <Button variant="primary" className={s.button} disabled={name === '' || phone === '' || desire === '' || !check}>
                            Отправить
                        </Button>
                    </div>

                </Form>
            </Modal.Body>
        </Modal>
    )
}

let mapStateToProps = (state: RootState) => {
    return {
        isOpen: state.connect.isModalOpen
    }
}

export default connect(mapStateToProps, {setModalOpen})(ModalForm)