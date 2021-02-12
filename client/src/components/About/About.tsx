import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import s from './About.module.scss'
import {NavLink} from "react-router-dom";

const About = () => {
    return (
        <Container className={s.aboutWrapper}>
            <Row className={s.titleContainer}>
                <div></div>
                <h2 className={s.title}>Обо мне</h2>
            </Row>
            <Row>
                <Col className={s.imageContainer}>
                    <div className={s.image}>
                        <Image src={'https://picsum.photos/220/270'}/>
                    </div>
                    <div >
                        <Image src={'https://picsum.photos/290/360'}/>
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
                </Col>
            </Row>
            <Row className={s.secondRow}>
                <Col className={s.textContainer}>
                    <p className={s.text}>
                        Развивая эту тему, социальная психология искусства продолжает фарс. Диалогичность, в первом
                        приближении, свободна.
                        Его экзистенциальная тоска выступает как побудительный мотив творчества, однако принцип артистизма
                        многопланово дает
                        невротический синтез искусств, однако само по себе состояние игры всегда амбивалентно.
                    </p>
                </Col>
                <Col>
                    <Image src={'https://picsum.photos/480/530'}/>
                </Col>
            </Row>
        </Container>
    )
}

export default About