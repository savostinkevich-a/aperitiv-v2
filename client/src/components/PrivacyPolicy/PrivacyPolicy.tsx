import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import s from './PrivacyPolicy.module.scss'

const PrivacyPolicy = () => {

    useEffect(() => {
        window.scroll(0,0)
    }, [])

    return (
        <Container className={s.privacyWrapper} fluid={'md'}>
            <Row className={s.titleContainer}>
                <h2 className={s.title}>Политика конфиденциальности</h2>
            </Row>
        </Container>
    )
}

export default PrivacyPolicy
