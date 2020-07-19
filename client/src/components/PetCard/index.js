import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Card, CardTitle, Icon, Col, Row } from 'react-materialize'
import 'materialize-css'


function PetCard ({pets}) {
    const renderCard = () => {
        if ( pets.length > 0 ) {
            return (
                <Row>
                    <Col
                        s={12}
                        className='center'
                    >
                        <Card
                        closeIcon={<Icon>close</Icon>}
                        header={<CardTitle image={ pets[0].image } reveal waves="light"/>}
                        reveal={<p> { pets[0].bio } </p>}
                        revealIcon={<Icon>more_vert</Icon>}
                        title={ pets[0].name}
                        >
                        <p>I am a { pets[0].age } year old { pets[0].gender } { pets[0].breed } about the size of { pets[0].size }</p>
                        </Card>
                    </Col>
                </Row>
            )
        }
        else {
            return (
                <h1> You have no pets :(<br/> Add a pet below! </h1>
            )
        }
    }
    return renderCard()
}

export default PetCard
