import React from "react";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import s from './TitleHP.module.scss'
import titleImage from './../../../assets/img/titleImage.png'

type PropsType = {
    openModal(isOpen: boolean):void
}

const TitleHP = (props: PropsType) => {
    return (
        <div className={s.titleWrapper}>
            <Container className={s.titleContainer}>
                <Row lg={2} sm={1} xs={1} className={s.titleRow}>
                    <Col className={s.titleCol}>
                        <h1 className={s.titleH1}>Создаю бельё твоих фантазий</h1>
                        <p className={s.titleP}>Если в каталоге нет того, что бы вы хотели, заполняйте форму и мы с вами свяжемся.</p>
                        <Button className={s.titleButton} onClick={() => props.openModal(true)}>Заполнить</Button>
                    </Col>
                    <Col className={s.titleCol}>
                        <div className={s.imageContainer}>
                            <Image src={titleImage} className={s.image}/>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default TitleHP