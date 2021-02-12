import React from "react";
import {Container, Row, Col, Button, Image} from "react-bootstrap";
import s from './FormHP.module.scss'

type PropsType = {
    openModal(isOpen: boolean):void
}

const FormHP = (props: PropsType) => {
    return (
        <div className={s.formWrapper}>
            <Container className={s.formContainer}>
                <Row className={s.formRow}>
                    <Col className={s.textContainer}>
                        <h2 className={s.title}>Не нашли то самое нижнее бельё?</h2>
                        <p className={s.textP}>Если в каталоге нет того, что бы вы хотели, заполняйте форму и мы с вами свяжемся.</p>
                        <Button className={s.button} onClick={() => props.openModal(true)}>Заполнить</Button>
                    </Col>
                    <Col className={s.imageContainer}>
                        <Image src={'https://picsum.photos/520/420'}/>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default FormHP