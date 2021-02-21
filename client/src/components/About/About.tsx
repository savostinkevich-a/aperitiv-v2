import React, { useEffect } from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import s from './About.module.scss'
import about1 from '../../assets/img/about1.jpg';
import about2 from '../../assets/img/about2.jpg';
import about3 from '../../assets/img/10.jpg';
import about4 from '../../assets/img/22.jpg';


const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <Container className={s.aboutWrapper} fluid={'md'}>
            <Row className={s.titleContainer}>

                <h2 className={s.title}>Обо мне</h2>
            </Row>
            <Row md={2} >
                <Col className={s.imageContainer}>
                    <div className={s.image}>
                        <Image className={s.firstImage} src={about1}/>
                    </div>
                    <div >
                        <Image className={s.secondImage} src={about2} />
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
            <Row xs={2} className={s.xsImageWrapper}>
                <Col>
                    <div className={s.xsImageContainer}>
                        <div>
                            <img src={about3} className={s.xsImages}/>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className={s.xsImageContainer}>
                        <div>
                            <img src={about4} className={s.xsImages}/>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className={s.secondRow} md={2}>
                <Col className={s.textContainerSecond}>
                    <p className={s.text}>
                        Развивая эту тему, социальная психология искусства продолжает фарс. Диалогичность, в первом
                        приближении, свободна.
                        Его экзистенциальная тоска выступает как побудительный мотив творчества, однако принцип артистизма
                        многопланово дает
                        невротический синтез искусств, однако само по себе состояние игры всегда амбивалентно.
                    </p>
                </Col>
                <Col className={s.thirdImageContainer}>
                    <Image className={s.thirdImage} src={'https://picsum.photos/480/530'}/>
                </Col>
            </Row>
        </Container>
    )
}

export default About