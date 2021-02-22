import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Modal, Row } from 'react-bootstrap';
import { GrClose } from 'react-icons/gr';
import s from './Modal.module.scss';
import { gql, useMutation } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { FiPaperclip } from 'react-icons/fi';
import Loader from '../Loader/Loader';

type PropsType = {
    isOpen: boolean
    setIsOpen(isOpen: boolean): void
}

const ADD_CONNECT = gql`
    mutation AddConnect($name: String!, $phone: String!, $desires: [String!], $desiresText: String!) {
        createConnect(createConnectData: {
            name: $name,
            phone: $phone,
            desires: $desires,
            desiresText: $desiresText
        }) {
            name
        }
    }
`;

const ModalForm = (props: PropsType) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [desire, setDesire] = useState('');
    const [previewSource, setPreviewSource] = useState<Array<string | ArrayBuffer | null>>([]);
    const [imageUrls, setImageUrls] = useState<Array<string>>([]);
    const [check, setCheck] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [imageSizeError, setImageSizeError] = useState(false);

    const [inputError, setInputError] = useState('')

    const inputRef = React.useRef<HTMLInputElement>(null);

    const previewFile = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(oldArray => [...oldArray, reader.result]);
        };
    };

    const handleFileInputChange = async (e: any) => {
        const files = e.target.files;
        for  (let i = 0; i < files.length; i++) {
            if (files[i].size > 10485760) {
                // @ts-ignore
                inputRef.current.value = '';
                setImageSizeError(true);
                setTimeout(() => {
                    setImageSizeError(false)
                },3000)
            }
        }
        if (!imageSizeError) {
            for  (let i = 0; i < files.length; i++) {
                previewFile(files[i]);
            }
        }
    };

    const uploadImage = async (base64EncodedImage: string | ArrayBuffer | null | undefined) => {
        try {
            await fetch('https://aperitiv.herokuapp.com/api/upload/client', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-type': 'application/json' },
            }).then((response) => {
                return response.json().then((data) => {
                    console.log(data);
                    setImageUrls(oldArray => [...oldArray, data]);
                });
            });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (previewSource.length === imageUrls.length && imageUrls.length > 0) {
            createHandler().then(() => {
            });
        }
    }, [imageUrls]);

    const createHandler = async () => {
        try {
            addConnect({
                variables: {
                    name,
                    phone,
                    desires: imageUrls,
                    desiresText: desire,
                },
            }).then(() => {
                setIsFetching(false);
                setSuccess('Успех');
                clearForm();
            });
        } catch (e) {
            setIsFetching(false);
            setError('Беда');
        }
    };

    const clearForm = () => {
        setName('');
        setPhone('');
        setDesire('');
        setPreviewSource([]);
        setImageUrls([]);
        setCheck(false);
    };

    const closeHandler = () => {
        props.setIsOpen(false);
        if (error || success) {
            setError('');
            setSuccess('');
        }
    };

    const [addConnect] = useMutation(ADD_CONNECT, {
        onError: () => {
            setIsFetching(false);
            setError('Что-то пошло не так');
            console.log('Что-то пошло не так');
        },
    });


    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (name === '' || phone === '') {
            setInputError('Пожалуйста, заполните поля, отмеченные красным')
        } else if (!check) {
            setInputError('Нужно принять условия политики конфиденциальности')
        } else {
            setIsFetching(true);
            if (previewSource.length === 0) {
                createHandler().then(() => {
                });
            }
            previewSource.forEach(i => uploadImage(i));
        }
    };

    const ClientForm = <Form onSubmit={handleSubmit}>
        {inputError !== '' && <div className={s.errorText}>{inputError}</div>}
        <Form.Group>
            <Form.Control className={inputError === '' ? s.inputItem : s.inputItem__error} type="text" placeholder="Имя"
                          value={name} onChange={event => setName(event.target.value)}
            />
        </Form.Group>

        <Form.Control className={inputError === '' ? s.inputItem : s.inputItem__error} type="number" placeholder="Телефон"
                      value={phone} onChange={event => setPhone(event.target.value)}
        />
        <Form.Group className={s.desiresContainer}>
            <Form.Control className={s.desiresInput} type="text" placeholder="Ваши пожелания"
                          value={desire} onChange={event => setDesire(event.target.value)}
            />
            <Form.File multiple onChange={handleFileInputChange} ref={inputRef} className={s.invisibleFileInput}
                       accept=".png, .jpg, .jpeg" />
            <Button
                className={s.fileInputButton}
                onClick={() => {
                    // @ts-ignore
                    inputRef.current.click();
                }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g >
                    <path d="M3.84405 14C2.94235 14 2.04062 13.6568 1.35418 12.9704C-0.0185956 11.5973 -0.018443 9.36366 1.35459 7.9909L8.59306 0.752436C9.59652 -0.250888 11.229 -0.250736 12.2322 0.752436C12.7236 1.24384 12.9914 1.89017 12.9914 2.57717C12.9914 3.26418 12.7235 3.91049 12.2372 4.39666L5.55846 11.0748L5.46986 11.1539C4.90299 11.7129 3.98718 11.7104 3.42308 11.1466L3.4098 11.133C3.13848 10.8618 2.98719 10.497 2.98719 10.1092C2.98719 9.72137 3.1385 9.35644 3.41298 9.08209L6.88223 5.61271C7.01731 5.47746 7.23645 5.47746 7.3716 5.61271C7.50683 5.74782 7.50683 5.96694 7.3716 6.10204L3.90246 9.57157C3.75863 9.7154 3.67946 9.90642 3.67946 10.1094C3.67946 10.3123 3.75863 10.5033 3.90246 10.6471L3.91574 10.6607C4.20892 10.9538 4.69148 10.9538 4.98786 10.6574L11.7478 3.90742C12.1034 3.55179 12.2993 3.07948 12.2993 2.57728C12.2993 2.07509 12.1034 1.60277 11.7478 1.24715C11.0093 0.508514 9.81603 0.508514 9.08237 1.24205L1.84392 8.48021C0.740807 9.58319 0.740654 11.378 1.84351 12.4809C2.94677 13.5838 4.74161 13.5838 5.84444 12.4809L13.0828 5.24226C13.218 5.107 13.437 5.107 13.5721 5.24226C13.7074 5.37736 13.7074 5.59648 13.5721 5.73161L6.33379 12.9702C5.6475 13.6566 4.74575 14 3.84405 14Z" fill="#6C6C6C"/>
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="14" height="14" fill="white" transform="translate(-0.000854492)"/>
                    </clipPath>
                </defs>
            </svg></Button>
        </Form.Group>

        {previewSource.length > 0 &&
        <>
            <div className={s.imagePreviewContainer}>
                {previewSource.map(image => {
                    return <div className={s.imagePreview}>
                        <div onClick={() => {
                            const array = [...previewSource];
                            array.splice(array.indexOf(image), 1);
                            setPreviewSource(array);
                        }} className={s.imagePreviewCloseButton}>
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.21666 0.213867L4.50007 3.93219L0.783481 0.213867L0.214355 0.779529L3.93287 4.49965L0.214355 8.2199L0.783481 8.7853L4.50007 5.0671L8.21666 8.7853L8.78578 8.2199L5.06727 4.49965L8.78578 0.779529L8.21666 0.213867Z" fill="white"/>
                            </svg>
                        </div>
                        <Image
                            //@ts-ignore
                               src={image} />
                    </div>
                })}
            </div>
        </>
        }
        {imageSizeError && <div className='mb-3'>Максимальный вес картинки 10mb</div>}
        <div className={s.checkboxContainer}>
            <span className={s.checkboxText} onClick={() => setCheck(!check)}>Я принимаю условия политики конфиденциальности </span>
            <label className={s.checkbox} style={inputError === '' ? {border: '1px solid #ccc'} : {border: '1px solid red'}}>
                <input type="checkbox" checked={check} onChange={() => setCheck(!check)} />
                <span className={s.default} />
            </label>
        </div>
        <div className={s.buttonContainer}>
            <Button variant="primary" className={s.button}
                    // disabled={name === '' || phone === '' || desire === '' || !check}
                    type='submit'
            >Отправить</Button>
        </div>
        <div className={s.linkContainer}>
            <NavLink to={'/privacy-policy'} onClick={closeHandler} className={s.checkboxText_link} >Политика конфиденциальности </NavLink>
        </div>

    </Form>;


    if (isFetching) {
        return <Loader />;
    }

    return (
        <Modal
            show={props.isOpen}
            onHide={() => props.setIsOpen(false)}
            backdrop="static"
            keyboard={false}
            contentClassName={s.modalWrapper}
            className={s.modal}
        >
            <Row className={s.closeButtonRow}>
                <GrClose className={s.closeButton} onClick={closeHandler} />
            </Row>
            <Modal.Body className={s.modalContainer}>

                <Row className={s.titleRow}>
                    {error && 'Что-то пошло не так :('}
                    {success && 'Спасибо!'}
                    {error === '' && success === '' && 'Заполните форму'}
                </Row>

                {success && <div className={s.responseText}>Мы свяжемся с вами в ближайшее время</div>}
                {error &&
                <div className={s.responseText}>Возможно беда с интернетом, проверьте, пожалуйста, и попробуйте еще
                    раз</div>}

                {error === '' && success === '' && ClientForm}
            </Modal.Body>
        </Modal>
    );
};

// let mapStateToProps = (state: RootState) => {
//   return {
//     isOpen: state.connect.isModalOpen,
//   };
// };
//
// export default connect(mapStateToProps, { setModalOpen })(ModalForm);

export default ModalForm;