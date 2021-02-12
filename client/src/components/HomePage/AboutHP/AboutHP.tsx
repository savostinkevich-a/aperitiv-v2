import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import s from './AboutHP.module.scss'
import {NavLink} from "react-router-dom";
import about1 from '../../../assets/img/about1.jpg'
import about2 from '../../../assets/img/about2.jpg'

const AboutHP = () => {
    return (
        <Container className={s.aboutWrapper}>
            <Row className={s.titleContainer}>
                <div></div>
                <h2 className={s.title}>Обо мне</h2>
            </Row>
            <Row>
                <Col className={s.imageContainer}>
                    <div className={s.image}>
                        <Image src={about1} width='220px' height='270px'/>
                    </div>
                    <div >
                        <Image src={about2} width='290px' height='360px'/>
                    </div>

                </Col>
                <Col className={s.textContainer}>
                    <p className={s.text}>
                        Развивая эту тему, социальная психология искусства продолжает фарс. Диалогичность, в первом
                        приближении, свободна.
                        Его экзистенциальная тоска выступает как побудительный мотив творчества, однако принцип артистизма
                        многопланово дает
                        невротический синтез искусств, однако само по себе состояние игры всегда амбивалентно.
                    </p>
                    <NavLink to={'/about'} className={s.link}>Читать больше</NavLink>
                </Col>
            </Row>

        </Container>
    )
}

export default AboutHP