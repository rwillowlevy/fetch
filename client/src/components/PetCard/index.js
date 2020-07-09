import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Card, CardTitle, Icon, Col, Row } from 'react-materialize'
import 'materialize-css'


function PetCard (props) {
    const renderCard = () => {
        if ( props.pets > 0 ) {
            return (
                <Row>
                    <Col
                        m={6}
                        s={12}
                    >
                        <Card
                        closeIcon={<Icon>close</Icon>}
                        header={<CardTitle image="https://materializecss.com/images/sample-1.jpg" reveal waves="light"/>}
                        reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}
                        revealIcon={<Icon>more_vert</Icon>}
                        title="Card Title"
                        >
                        <p>
                            <a href="#">
                            This is a link
                            </a>
                        </p>
                        </Card>
                    </Col>
                </Row>
            )
        }
        else {
            return (
                <h1> You have no pets :( Add a pet below! </h1>
            )
        }
    }
    return renderCard()
}

export default PetCard
